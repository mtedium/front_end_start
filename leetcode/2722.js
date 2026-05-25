var join = function (arr1, arr2) {
  const combinedArray = arr1.concat(arr2);
  const merged = {};

  combinedArray.forEach((obj) => {
    const id = obj.id;
    if (!merged[id]) {
      merged[id] = { ...obj };
      console.log("T");
      console.log(merged[id]);
    } else {
      merged[id] = { ...merged[id], ...obj };
      console.log("F");
      console.log(merged[id]);
    }
  });

  const joinedArray = Object.values(merged);
  joinedArray.sort((a, b) => a.id - b.id);

  return joinedArray;
};

const arr1 = [
  { id: 1, x: 1 },
  { id: 2, x: 9 },
];
const arr2 = [{ id: 3, x: 5 }];

join(arr1, arr2);
// console.log(join(arr1, arr2));

// [
//     {"id": 1, "x": 1},
//     {"id": 2, "x": 9},
//     {"id": 3, "x": 5}
// ]
