exports.getStackTrace = () => {
  const splitter = process.platform !== "win32" ? "/" : "\\";
  const osMap = (i) => (process.platform === "win32" ? i + 1 : i);
  let stack = new Error().stack || "";
  stack = stack.split("\n").map(function (line) {
    return line.trim();
  });
  const data = stack.splice(stack[0] == "Error" ? 2 : 1);
  const regex = /\(([^)]+)\)/;
  const stackInfo = data[0].split(" ");
  const functionCall = stackInfo[1];
  const fileData = regex.exec(stackInfo[2])[1].split(":");
  const file = fileData[osMap(0)].split(splitter);
  return {
    functionCall,
    file: file[file.length - 1],
    line: fileData[osMap(1)],
    char: fileData[osMap(2)],
  };
};
