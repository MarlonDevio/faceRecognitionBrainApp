import { particlesInit, particlesLoaded } from './assets/particles/Particles';
import { particleOptions } from './assets/particles/ParticleOptions';
import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImagelinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import { loadFaceRecognition } from './assets/clarifai/Clarifai.js';

// https://samples.clarifai.com/metro-north.jpg
function App() {
  const particlesInitMemoized = useCallback(particlesInit, []);
  const particlesLoadedMemoized = useCallback(particlesLoaded, []);

  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState();

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);
    setInput("");
    // getData(input.trim());
  };

  useEffect(() => {
    if (imageURL) {
      loadFaceRecognition(imageURL.trim());
    }
  }, [imageURL]);

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
      <FaceRecognition imageURL={imageURL} />
    </div>
  );
}

export default App;
