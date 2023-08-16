// Importing necessary modules and components
import { particlesInit, particlesLoaded } from "./assets/particles/Particles";
import { particleOptions } from "./assets/particles/ParticleOptions";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImagelinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import { loadFaceRecognition } from "./assets/clarifai/Clarifai.js";

function App() {
  // Using useCallback to memoize the particles' initialization and loading functions.
  // This ensures that these functions don't get recreated every time the component re-renders.
  const particlesInitMemoized = useCallback(particlesInit, []);
  const particlesLoadedMemoized = useCallback(particlesLoaded, []);

  // useState hooks to manage component's state
  const [input, setInput] = useState(""); // For the image URL input
  const [imageURL, setImageURL] = useState(""); // The URL to display and analyze
  const [box, setBox] = useState({}); // The data for face's bounding box

  // Event handler for changes in the input field
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  // Event handler for button click; sets the image URL and clears the input
  const onButtonSubmit = () => {
    setImageURL(input);
    setInput("");
  };

  // Function to calculate the bounding box around the face in the image
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data[0]; // Assuming there's only one face in the image
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left * width,
      topRow: clarifaiFace.top * height,
      rightCol: width - clarifaiFace.right * width,
      bottomRow: height - clarifaiFace.bottom * height,
    };
  };

  // useEffect hook to load face recognition data whenever imageURL changes
  useEffect(() => {
    if (imageURL) {
      loadFaceRecognition(imageURL.trim())
        .then((data) => {
          const faceData = calculateFaceLocation(data);
          setBox(faceData);
        })
        .catch((err) => {
          console.error("Error loading face recognition", err);
        });
    }
  }, [imageURL]);

  // Rendering the components for the app
  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInitMemoized}
        loaded={particlesLoadedMemoized}
        options={particleOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        input={input}
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageURL={imageURL} box={box} />
    </div>
  );
}

export default App;
