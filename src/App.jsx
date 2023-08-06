import { particlesInit, particlesLoaded } from "./assets/particles/Particles";
import { particleOptions } from "./assets/particles/ParticleOptions";
import { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImagelinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

function App() {
  const particlesInitMemoized = useCallback(particlesInit, []);
  const particlesLoadedMemoized = useCallback(particlesLoaded, []);

  const [input, setInput] = useState("");
  console.log(useState());

  const onInputChange = (ev) => {
    console.log(ev.target.value);
    setInput(ev.target.value);
  };

  const onButtonSubmit = () => {
    console.log("click");
  };

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
        onChange={onInputChange}
        submit={onButtonSubmit}
      />
      {/*	<FaceRecognition />}*/}
    </div>
  );
}

export default App;
