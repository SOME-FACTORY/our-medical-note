import { createRequire } from "node:module";
import { createBaseConfig } from "./base.js";

const require = createRequire(`${process.cwd()}/package.json`);

function getNativewindPreset() {
  try {
    return require("nativewind/preset");
  } catch (error) {
    throw new Error(
      "Native Tailwind config requires nativewind to be installed in the Expo app package.",
      { cause: error },
    );
  }
}

export function createNativeConfig({ presets = [], ...options } = {}) {
  return createBaseConfig({
    ...options,
    presets: [getNativewindPreset(), ...presets],
  });
}

export default createNativeConfig;
