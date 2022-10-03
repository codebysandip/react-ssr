import TestComp from "./test-comp-for-in-view.js";

export default TestComp;

export function loadData() {
  return new Promise<any>((resolve, reject) => {
    reject(new Error("Test Error"));
  });
}
