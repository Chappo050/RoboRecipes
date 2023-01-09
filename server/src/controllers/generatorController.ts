import test from "node:test";

const { Configuration, OpenAIApi } = require("openai");
const download = require("image-downloader");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function asyncFetchFunctionForRecipe(prompt: string): Promise<Object> {
  const results = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 3000,
  });
  return Promise.resolve(results.data);
}

async function asyncFetchFunctionForImage(prompt: string): Promise<Object> {
  const results = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  return Promise.resolve(results.data.data[0].url);
}

// Fetches a new recipe along with an image with a given prompt.
export const newRecipe = async (req, res, next) => {
  let image;
  let useDALLE: String = req.query.fetchImage;
  console.log(typeof useDALLE);

  const data = await asyncFetchFunctionForRecipe(req.query.prompt);

  //used later as the local URL
  let serverURL: String;

  //why is JS so stupid?
  if (useDALLE === "true") {
    console.log("fetching image with DALL E.");

    image = await asyncFetchFunctionForImage(req.query.prompt);

    //save image to server
    const randomID: string = (Math.random() * 10000).toFixed(0).toString();
    download.image({
      url: image,
      dest:
        "/home/matthew/Desktop/javascript/Projects/svelte_project/server/public/images/" +
        req.query.prompt +
        randomID +
        ".png",
      extractFilename: false,
    });

    //add reachable URL
    serverURL ="http://localhost:5000/images/" + req.query.prompt + randomID + ".png";
  } else {
    console.log("fetching no image");
    image = "no_image.png";
    serverURL = "no_image.png";
  }

  res.json({ text: data, image: serverURL, tempImage: image });
};
