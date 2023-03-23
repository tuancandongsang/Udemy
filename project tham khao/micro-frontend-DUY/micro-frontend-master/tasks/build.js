const concurrently = require("concurrently");
const path = require("path");
const logger = require("../logger.js");
const runTask = require("./run");

function createBuildCommand(packageManager, name, pathName) {
  const pmRun =
    packageManager === "npm" ? `${packageManager} run` : packageManager;
  const command = `${packageManager} install && ${pmRun} build`;
  return { command, name, cwd: path.resolve(__dirname, `${pathName}`) };
}

runTask((packageManager) => {
  logger.info(`*******Run with ${packageManager}********`);

  const commands = [
    createBuildCommand(
      packageManager,
      "netflix-service",
      "../not-netflix-main"
    ),
    createBuildCommand(packageManager, "bank-service", "../bank-service"),
    createBuildCommand(packageManager, "host", "../host"),
  ];

  const { result } = concurrently(commands, {
    successCondition: "all",
    hide: true,
  });

  result.then(
    () => logger.success("******* Build all projects successed *******"),
    (err) => console.error(err)
  );
});
