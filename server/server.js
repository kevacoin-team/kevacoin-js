#! /user/bin/node

const chalk = require("chalk");
const { spawn } = require("child_process");
const path = require("path");
const yargs = require("yargs");
const fs = require("fs");

const DefaultConfig = {
  ip: "localhost",
  allowedIps: ["0.0.0.0/0"],
  port: 5001,
  user: "keva-user",
  password: "J9JkYnPiXWqgRzg3vAA",
  quiet: false,
  threads: 1,
};

const args = yargs
  .scriptName("kevacoin-server")
  .command("start", "start the kevacoin daemon", (y) => {
    y.positional("config", {
      alias: "c",
      description: "the config.json to use",
      default: null,
      type: "string",
    });
  })
  .help().argv;

const file = fs.readFileSync(args.config).toString("utf-8");

if (!file || file === "") {
  throw new Error("Cannot read empty or malformed file");
}

const config = { ...DefaultConfig, ...JSON.parse(file) };

const commandArgs = [
  `-rpcbind=${config.ip}`,
  `-rpcallowip=${config.allowedIps.join(",")}`,
  `-rpcport=${config.port}`,
  `-rpcuser=${config.user}`,
  `-rpcpassword=${config.password}`,
  `-printtoconsole=${config.quiet ? 0 : 1}`,
  `-rpcthreads=${config.threads}`,
];

const Labels = {
  Process: chalk.green(config.label || "[kevacoind]"),
  Daemon: chalk.cyan("[kevacoind]"),
};
console.info(`${Labels.Process} Starting kevacoind proccess`);
console.info(`${Labels.Process} Using config - ${commandArgs.join(" ")}`);
// TODO: Add option for --debug where the config file gets printed here...

// Start formatted server
// const child = spawn(command[0], [command[1]]);

// child.on("error", (e) => {
//   console.error("error", e.message);
// });

// // c is of type Buffer
// child.stdout.on("data", (c) => {
//   // Chunks might come through with multiple lines
//   const content = c
//     .toString("utf-8")
//     .split("\n")
//     .map((line) => `${Labels.Daemon} ${line}`)
//     .join("\n");
//   console.info(content);
// });
