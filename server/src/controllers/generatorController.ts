import axios from "axios";
var Filter = require("bad-words"),
  filter = new Filter();
// import individual service

import S3 from "aws-sdk/clients/s3";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const s3 = new S3({
  region: "ap-northeast-1",
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
});

async function asyncFetchFunctionForRecipe(prompt: string): Promise<Object> {
  try {
    console.log("Fetching text started");

    const results = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000,
    });
    console.log(results.data);

    if (results.status !== 200) {
      console.log(results.status);

      console.log("prompt has been rejected");

      return Promise.reject("error");
    }
    if (results.data.usage.total_tokens <= 150) {
      console.log("prompt has been rejected");

      return Promise.reject("error");
    }

    console.log("Successfully fetched text");
    return Promise.resolve(results.data);
  } catch (error) {
    console.error("Error connecting to OpenAI", error);
    return Promise.reject(error);
  }
}
async function cleanPrompt(prompt: string): Promise<string> {
  try {
    const lastWordArray = prompt.split(" ");
    const lastWord = lastWordArray[lastWordArray.length - 1];
    console.log(lastWord);
    if (lastWord.toLowerCase() === "recipe") {
      return Promise.resolve(prompt);
    } else {
      return Promise.resolve(prompt + " " + "recipe");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
async function asyncFetchFunctionForImage(prompt: string): Promise<Object> {
  try {
    console.log("Fetching image started");
    const results = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    {
      if (results.status !== 200) {
        console.log("prompt has been rejected");

        return Promise.resolve("error");
      }
    }
    console.log("Successfully fetched Image");

    return Promise.resolve(results.data.data[0].url);
  } catch (error) {
    console.log("Error connecting to OpenAI", error);
    return Promise.resolve("error");
  }
}

// Fetches a new recipe along with an image with a given prompt.
export const newRecipe = async (req, res, next) => {
  try {
    let image: any;
    let useDALLE: String = req.query.fetchImage;
    const isProfane = filter.isProfane(req.query.prompt);

    if (isProfane) {
      console.log("Profanity Detected, request will fail");
      res.json({ isProfane: true });
    } else {
      const cleanedPrompt = await cleanPrompt(req.query.prompt);
      const data: Object | undefined = await asyncFetchFunctionForRecipe(
        cleanedPrompt
      );

      //used later as the local URL
      let serverURL: String;

      //why is JS so stupid?
      if (useDALLE === "true") {
        console.log("fetching image with DALL E.");

        //get image URL from openAI

        image = await asyncFetchFunctionForImage(cleanedPrompt);

        const response = await axios.get(image, {
          responseType: "arraybuffer",
        });
        const blob = await Buffer.from(response.data);

        //save image to server
        const randomID: string = (Math.random() * 10000).toFixed(0).toString();
        const params = {
          Key: cleanedPrompt + randomID + ".png",
          Bucket: "mlc-roborecipies",
        };
        const uploadedImage = await s3
          .putObject(
            {
              ContentEncoding: "base64",
              ContentType: "image/png",
              Body: blob,
              Bucket: "mlc-roborecipies",
              Key: cleanedPrompt + randomID + ".png",
            },
            function (err, data) {
              if (err) {
                console.log("error in uploading file");
              }
              if (data) {
                console.log("Upload Success", data);
              }
            }
          )
          .promise();
        serverURL =
          "https://mlc-roborecipies.s3.ap-northeast-1.amazonaws.com/" +
          cleanedPrompt +
          randomID +
          ".png";
      } else {
        console.log("fetching no image");
        image = "no_image.png";
        serverURL = "no_image.png";
      }

      //Make sure the data is in the correct format
      console.log(data);

      res.json({
        text: data,
        image: serverURL,
        tempImage: image,
        isProfane: isProfane,
      });
    }
  } catch (error) {
    console.log("error");

    res.status(400).json({ isProfane: true });
  }
};
