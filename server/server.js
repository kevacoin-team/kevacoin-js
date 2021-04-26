#! /user/bin/env node

const chalk = require("chalk");
const { spawn } = require("child_process");
const path = require("path");

const command = [
  path.resolve(__dirname, "kevacoind"),
  // TODO: Check if this file exists before executing
  `--conf=${path.resolve(__dirname, "../")}/kevacoin.conf`,
];

const Labels = {
  Process: chalk.green("[process]"),
  Daemon: chalk.cyan("[kevacoind]"),
};
console.info(`${Labels.Process} Starting kevacoind proccess`);
console.info(`${Labels.Process} Running - ${command.join(" ")}`);
// TODO: Add option for --debug where the config file gets printed here...

// Start formatted server
const child = spawn(command[0], [command[1]]);

child.on("error", (e) => {
  console.error("error", e.message);
});

// c is of type Buffer
child.stdout.on("data", (c) => {
  // Chunks might come through with multiple lines
  const content = c
    .toString("utf-8")
    .split("\n")
    .map((line) => `${Labels.Daemon} ${line}`)
    .join("\n");
  console.info(content);
});
