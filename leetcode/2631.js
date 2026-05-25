/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  const res = new Object();
  for (let i = 0; i < this.length; i++) {
    let key = fn(this[i]);
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(this[i]);
  }
  return res;
};

var array = [{ id: "1" }, { id: "1" }, { id: "2" }];
var fn = function (item) {
  return item.id;
};

console.log(array.groupBy(fn));
