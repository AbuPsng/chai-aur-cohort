// // Polyfill of forEach

// const hero = ["spider man ", "super man", "hulk", "thor", "thanos"];

// Array.prototype.meat = function () {
//   console.log("eating meat");
// };

// //Funtion of forEach is to iterate over each element and perform given funtion on original array
// //Take arguement=> current value , index
// // return => doesn't return

// if (!Array.prototype.ForEach) {
//   Array.prototype.ForEach = function (cb) {
//     for (let i = 0; i < this.length; i++) {
//       cb(this[i], i);
//     }
//   };
// }

// // hero.ForEach((e) => console.log(e + 2));

// // Polyfill of map

// if (!Array.prototype.Map) {
//   Array.prototype.Map = function (cb) {
//     const newArray = [];
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i);
//       newArray.push(result);
//     }

//     return newArray;
//   };
// }

// // const result = hero.Map((e) => e + 2);

// // Polyfill of filter

// if (!Array.prototype.Filter) {
//   Array.prototype.Filter = function (cb) {
//     const newArray = [];
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i);
//       if (result) {
//         newArray.push(this[i]);
//       }
//     }

//     return newArray;
//   };
// }

// // const result = hero.Filter((i) => i !== "thor");

// // Polyfill of reduce

// if (!Array.prototype.Reduce) {
//   Array.prototype.Reduce = function (cb, initialNumber) {
//     let newValue = initialNumber;
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(newValue, this[i]);
//       newValue += result;
//     }

//     return newValue;
//   };
// }

// const number = [1, 2, 3, [4, 5, 90], ["ar", "ra", "y"]];

// // const result = number.Reduce((sum, i) => sum + i, 0);

// // Polyfill of find

// if (!Array.prototype.Find) {
//   Array.prototype.Find = function (cb) {
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i, this);
//       if (result) {
//         return this[i];
//       }
//     }

//     return undefined;
//   };
// }

// // let res = number.Find((i) => i > 10);

// // Polyfill of FindIndex

// if (!Array.prototype.FindIndex) {
//   Array.prototype.FindIndex = function (cb) {
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i, this);
//       if (result) {
//         return i;
//       }
//     }

//     return -1;
//   };
// }

// // let res = number.FindIndex((i) => i > 2);

// // Polyfill of some

// if (!Array.prototype.Some) {
//   Array.prototype.Some = function (cb) {
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i, this);
//       if (result) {
//         return true;
//       }
//     }

//     return false;
//   };
// }

// // let res = number.Some((i) => i > 100);

// // Polyfill of every

// if (!Array.prototype.Every) {
//   Array.prototype.Every = function (cb) {
//     for (let i = 0; i < this.length; i++) {
//       const result = cb(this[i], i, this);
//       if (!result) {
//         return false;
//       }
//     }

//     return true;
//   };
// }

// // let res = number.Every((i) => i < 10);
// // console.log(res);

// // Polyfill of flat

// if (!Array.prototype.Flat) {
//   Array.prototype.Flat = function () {
//     let newArray = [];
//     for (let i = 0; i < this.length; i++) {
//       if (typeof this[i] === "object" && this[i].length >= 1) {
//         newArray = [...newArray, ...this[i]];
//       } else {
//         newArray.push(this[i]);
//       }
//     }

//     return newArray;
//   };
// }

// // let res = number.Flat();

// // Polyfill of reverse

// if (!Array.prototype.Reverse) {
//   Array.prototype.Reverse = function () {
//     const reverseArray = [];
//     for (let i = 0; i < this.length; i++) {
//       reverseArray.unshift(this[i]);
//     }

//     return reverseArray;
//   };
// }

// let res = number.Reverse();
// console.log(res);

let resultHero = hero("G One");
let resultVillain = villain("Ra One");

let hero = (name) => {
  console.log(`This hero name is ${name}`);
};

function villain(name) {
  console.log(`This villain name is ${name}`);
}
