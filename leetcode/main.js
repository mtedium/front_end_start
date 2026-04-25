function memoize(fn) {
    let mems = [
        [[1,2],3],
    ]
    return function(...args) {
        // console.log(args)
        for (let mem of mems) {
            // console.log(mem)
            // console.log(JSON.stringify(args))
            // console.log(JSON.stringify(args) === JSON.stringify(mem[0]))
            if (JSON.stringify(args) === JSON.stringify(mem[0])) {
                console.log('use mem ' + mem[1]);
                return mem[1]
           }
        }

        let result = fn(...args)
        mems.push([args, result])
        console.log('unuse mem '+ result)
        return result
    }
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
});
memoizedFn(1, 2) // 3 无调
memoizedFn(2, 3) // 5 调
memoizedFn(2, 3) // 5 无
console.log(callCount) // 1 
