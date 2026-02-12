export const fakeApiCall = () => {
  return new Promise((resolve, reject) => {
    
    const delay = Math.random() * 1000 + 1000;

    setTimeout(() => {
    
     const shouldFail = Math.random() < 0.2;


      if (shouldFail) {
        reject("API failed");
      } else {
        resolve("Success");
      }
    }, delay);
  });
};
