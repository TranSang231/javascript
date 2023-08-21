function doSomeThing(callback) {
    return callback();
  }
  
  function sayHi() {
    console.log("Hi");
  }
  
  doSomeThing(sayHi);
  
  // ----------------
  let promise = new Promise(function (resolve, reject) {
    let x = 0;
    if (x > 10) {
      resolve(x);
    } else {
      reject("To low");
    }
  });
  
  promise.then(
    function (value) {
      console.log("success:", value);
    },
    function (error) {
      console.log("error:", error);
    }
  );
  
  // ------------------------
  const promise1 = new Promise(function (resolve, reject) {
    reject("ops...");
  });
  
  promise1
    .then((value) => {
      console.log(value);
      return "we";
    })
    .then((value) => {
      console.log(value);
      return "can";
    })
    .then((value) => {
      console.log(value);
      return "change";
    })
    .then((value) => {
      console.log(value);
      return "promises";
    })
    .then((value) => {
      console.log(value);
    })
    .catch((value) => {
      console.log(value);
    });
  
  //
  function saySomeThing(x) {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve('something ' + x)
          }, 2000);
      })
  }
  
  async function talk(x) {
      const words = await saySomeThing(x);
      console.log(words);
  }
  
  talk(2);