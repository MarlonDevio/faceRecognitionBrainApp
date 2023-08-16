const PAT = "215cc87c5d3f4bc8b1a0ac2493f80999";
const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

// Create requestOptions
const createRequestOptions = (imageURL) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

// GetData function
const getData = async (url) => {
  try {
    const res = await fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      createRequestOptions(url),
    );

    if (!res.ok) throw new Error(`There has been an error! ${res.statusText}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const loadFaceRecognition = async (url) => {
  try {
    const data = await getData(url);

    const regionBoxes = data.outputs[0].data.regions.map((reg) => {
      return {
        top: reg.region_info.bounding_box.top_row,
        left: reg.region_info.bounding_box.left_col,
        bottom: reg.region_info.bounding_box.bottom_row,
        right: reg.region_info.bounding_box.right_col,
      };
    });
    console.log(regionBoxes);
    console.log(calculateFaceLocation(regionBoxes));
  } catch (err) {
    throw err;
  }
};

const calculateFaceLocation = (data) => {
  const clarifaiFace = data;
  const image = document.getElementById("inputimage");
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftCol: clarifaiFace[0].left * width,
    topRow: clarifaiFace[0].top * height,
    rightCol: width - clarifaiFace[0].right * width,
    bottomRow: height - clarifaiFace[0].bottom * height,
  };
};

/*** DESTRUCTURING ***/
// const loadFaceRecognition = async (url) => {
//   try {
//     const data = await getData(url);
//
//     const boundingBoxes = data.outputs[0].data.regions.map(({ region_info: { bounding_box } }) => {
//       const { top_row: top, left_col: left, bottom_row: bottom, right_col: right } = bounding_box;
//       return { top, left, bottom, right };
//     });
//
//     console.log(boundingBoxes);
//   } catch (err) {
//     throw err;
//   }
// };
