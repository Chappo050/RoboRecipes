import axios from "axios";
// import individual service
import S3 from "aws-sdk/clients/s3";
const { Configuration, OpenAIApi } = require("openai");
const download = require("image-downloader");
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
    
    console.log("Successfully fetched text");
    return Promise.resolve(results.data);
  } catch (error) {
    console.log("Error connecting to OpenAI", error);
    return Promise.resolve("error");
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
    console.log("Successfully fetched Image");
    
    return Promise.resolve(results.data.data[0].url);
  } catch (error) {
    console.log("Error connecting to OpenAI", error);
    return Promise.resolve(error);
  }
}

// Fetches a new recipe along with an image with a given prompt.
export const newRecipe = async (req, res, next) => {
  let image: any;
  let useDALLE: String = req.query.fetchImage;

  const data: Object | undefined = await asyncFetchFunctionForRecipe(
    req.query.prompt
  );

  if (!data) {
    res.json({ message: "An error has occured while fetching the data" });
  }


  //used later as the local URL
  let serverURL: String;

  //why is JS so stupid?
  if (useDALLE === "true") {

    console.log("fetching image with DALL E.");

    //get image URL from openAI

    image = await asyncFetchFunctionForImage(req.query.prompt);
    console.log(typeof image);
    
    if (!image) {
      res.json({ message: "An error has occured while fetching the data" });
    }

    const response = await axios.get(image, { responseType: "arraybuffer" });
    const blob = await Buffer.from(response.data);

    //save image to server
    const randomID: string = (Math.random() * 10000).toFixed(0).toString();
    const params = {
      Key: req.query.prompt + randomID + ".png",
      Bucket: "mlc-roborecipies",
    };
    const uploadedImage = await s3
      .putObject(
        {
          ContentEncoding: "base64",
          ContentType: "image/png",
          Body: blob,
          Bucket: "mlc-roborecipies",
          Key: req.query.prompt + randomID + ".png",
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
      req.query.prompt +
      randomID +
      ".png";
  } else {
    console.log("fetching no image");
    image = "no_image.png";
    serverURL = "no_image.png";
  }

  res.json({ text: data, image: serverURL, tempImage: image });
};
