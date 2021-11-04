import initializeAPI from "./api/initialize";

if (window.HydroCord) throw new Error("HydroCord is already injected");

initializeAPI();
