import { loadSlim } from "tsparticles-slim";

export async function particlesInit(engine) {
  await loadSlim(engine);
}

export async function particlesLoaded(container) {
  console.log(container);
}
