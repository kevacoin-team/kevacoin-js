const { KevaClient } = require("../dist/main");

// This is a purely development file, you can commit it if you want, but it's better to not commit here
// If you intend to demonstrate a feature/flow/function, please create an example instead

(async () => {
  console.log("[process] Running consumer file");
  try {
    const app = new KevaClient({
      namespace: "my-keva-namespace",
      credentials: {
        username: "keva-user",
        password: "J9JkYnPiXWqgRzg3vAA",
      },
    });
    //
    // ==================================
    // Add your method dev code here
    // ==================================
    // app.myNewMethod(...params)
    //
  } catch (e) {
    if (e.message.includes("ECONNREFUSED")) {
      console.error(
        "[process] Could not connect to kevacoind. pleaes make sure daemon is running and ports are open"
      );
    }
  }
  console.log("[process] Done running consumer file");
})();
