// export default {
//   testEnvironment: "node",
//   transform: {},
//   verbose: true,
//   setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
//     extensionsToTreatAsEsm: [".js"],

//   transform: {},
// };



export default {
  testEnvironment: "node",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  transform: {},   // required for ESM
};
