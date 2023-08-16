// Constants that define the API's base URL, user details, model details, and authorization.
const BASE_URL = "https://api.clarifai.com/v2/models/";
const PAT = "215cc87c5d3f4bc8b1a0ac2493f80999"; // Personal Access Token for the API.
const USER_ID = "clarifai"; // Specified user ID for the API.
const APP_ID = "main"; // Specified app ID for the API.
const MODEL_ID = "face-detection"; // The ID of the model we're using (in this case, face detection).
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105"; // Version ID of the face detection model.

// Function to create the necessary request options for the API call.
// It includes the HTTP method, headers, and the body content of the request.
const createRequestOptions = (imageURL) => ({
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Key ${PAT}`, // Use the Clarifai API key for authorization.
  },
  body: JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL, // The image URL to be analyzed by the API.
          },
        },
      },
    ],
  }),
});

// Function to get data from the Clarifai API.
// This function makes the actual API call using fetch and handles potential errors.
const getData = async (url) => {
  const endpoint = `${BASE_URL}${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`; // Constructing the full endpoint URL.
  try {
    const res = await fetch(endpoint, createRequestOptions(url));
    console.log(res);
    if (!res.ok) throw new Error(`There has been an error! ${res.statusText}`);

    const data = await res.json(); // Parsing the response to JSON.
    console.log(data);
    return data;
  } catch (err) {
    console.error(err); // Logging any errors that occur.
  }
};

// Function to load face recognition data from the Clarifai API.
// This function calls getData() and then processes the returned data
// to extract the bounding box information for detected faces.
export const loadFaceRecognition = async (url) => {
  try {
    const data = await getData(url);
    const boxes = data.outputs[0].data.regions.map((reg) => ({
      top: reg.region_info.bounding_box.top_row,
      left: reg.region_info.bounding_box.left_col,
      bottom: reg.region_info.bounding_box.bottom_row,
      right: reg.region_info.bounding_box.right_col,
    }));
    console.log(boxes);
    return boxes; // Return the array of bounding boxes for the detected faces.
  } catch (err) {
    throw err; // Propagate the error to the calling function.
  }
};
