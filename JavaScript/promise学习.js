// // 同步
// console.log(1);
// console.log(2);
// console.log(3);

// // 异步 非阻塞
// console.log("1");
// setTimeout(() => console.log("2"), 500); // 宏任务，延迟执行
// console.log("3"); // 这行会在 setTimeout 之前执行！

// // 回调
// function getUser(callback) {
//   setTimeout(() => {
//     callback({ name: "张三", age: 25 });
//   }, 500);
// }
// getUser((user) => {
//   console.log("获取到用户：" + user.name); // 回调谁来分辨callback类型都要反应老半天
// });

// console.log("这行代码会先执行");

// // 回调地狱
// // 登录 -> 获取权限 -> 具体功能
// function login(username, password, callback) {
//   setTimeout(() => {
//     if (username === "admin" && password === "123456") {
//       callback({ username: "admin", role: "管理员" });
//     } else {
//       console.log("登录失败");
//     }
//   }, 500);
// }

// function getPermission(role, callback) {
//   setTimeout(() => {
//     if (role === "管理员") {
//       callback("用户管理");
//     } else {
//       console.log("权限不足");
//     }
//   }, 500);
// }

// function getData(page, callback) {
//   setTimeout(() => {
//     if (page === "用户管理") {
//       callback("数据");
//     } else {
//       console.log("暂无数据");
//     }
//   }, 500);
// }

// login("admin", "123456", (User) => {
//   getPermission(User.role, (Page) => {
//     getData(Page, (data) => console.log(data))
//   })
// });

// // 异步需求摆在那里,但是旧语法会陷入回调地狱,
// // 于是Promise闪亮登场
// // Promise三种状态pending,fulfilled,rejected
// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ name: "张三", age: 25 });
//     }, 500);
//   });
// }

// fetchData()
//   .then((User) => {
//     console.log(User.name + User.age);
//   })
//   .catch((err) => {
//     console.log(Error);
//   });

// 刚才那个回调地狱的例子,改写为Promise
function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({ username: "admin", role: "管理员" });
        // console.log("登录成功");
      } else {
        reject("登录失败");
      }
    }, 500);
  });
}

function getPermission(role) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (role === "管理员") {
        resolve("用户管理");
        // console.log("权限满足");
      } else {
        reject("权限不足");
      }
    }, 500);
  });
}

function getData(page) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(page);
      if (page === "用户管理") {
        resolve("数据");
        // console.log("获取成功");
      } else {
        reject("暂无数据");
      }
    }, 500);
  });
}

// // login("admin", "123456")
// //   .then((User) => getPermission(User.role))
// //   .then((Page) => getData(Page));

// // Promise.all - 等待所有 Promise 完成
// Promise.all([
//   login("admin", "123456"),
//   getPermission("管理员"),
//   getData("用户管理"),
// ]).then(([User, Role, Page]) => {
//   console.log(User + Role + Page);
// });

// // Promise.race - 任意一个先完成
// // Promise.allSettled - 等待所有完成（无论成功或失败）

// async/await 是 Promise 的语法糖
// 重写上面的案例
async function main() {
  const User = await login("admin", "123456");
  const Role = await getPermission("管理员");
  const Page = await getData("用户管理");
  console.log(User, Role, Page);
}

main();