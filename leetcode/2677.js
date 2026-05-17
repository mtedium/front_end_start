/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  let cs = 0;
  let t = [];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (cs < size) {
      t.push(arr[i]);
      cs++;
      // console.log(cs, size)
    }

    if (cs == size || i == arr.length - 1) {
      result.push(t);
      t = [];
      cs = 0;
    }

  }
  return result;
};

var arr = [1, 9, 6, 3, 2];
var size = 3;
console.log(chunk(arr, size));
