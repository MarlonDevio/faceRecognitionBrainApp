import { particlesInit, particlesLoaded } from "./assets/particles/Particles";
import { particleOptions } from "./assets/particles/ParticleOptions";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImagelinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

function App() {
  const particlesInitMemoized = useCallback(particlesInit, []);
  const particlesLoadedMemoized = useCallback(particlesLoaded, []);

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
      <ImageLinkForm />
      {/*	<FaceRecognition />}*/}
    </div>
  );
}

export default App;
