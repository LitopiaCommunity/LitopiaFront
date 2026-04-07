import { readFileSync } from "node:fs";

const [
  ,
  ,
  target = "main",
  limitArg = "25",
  statsPath = "dist/LitopiaFront/stats.json",
] = process.argv;
const limit = Number.parseInt(limitArg, 10);

function listAvailableOutputs(outputs) {
  return outputs
    .map(
      ([fileName, output]) =>
        `${fileName}${output.entryPoint ? ` <= ${output.entryPoint}` : ""}`,
    )
    .join("\n");
}

const stats = JSON.parse(readFileSync(statsPath, "utf8"));
const outputs = Object.entries(stats.outputs ?? {}).filter(([fileName]) => {
  return !fileName.endsWith(".map");
});
const selectedOutput = outputs.find(([fileName, output]) => {
  return fileName.includes(target) || output.entryPoint?.includes(target);
});

if (!selectedOutput) {
  console.error(`No output found for target "${target}".`);
  console.error(listAvailableOutputs(outputs));
  process.exit(1);
}

const [fileName, output] = selectedOutput;
const rows = Object.entries(output.inputs ?? {})
  .map(([inputPath, input]) => ({
    inputPath,
    bytesInOutput: input.bytesInOutput ?? 0,
  }))
  .sort((left, right) => right.bytesInOutput - left.bytesInOutput)
  .slice(0, Number.isFinite(limit) ? limit : 25);

console.log(`Bundle: ${fileName}`);
if (output.entryPoint) {
  console.log(`Entry: ${output.entryPoint}`);
}
console.log("Bytes\tSource");
for (const row of rows) {
  console.log(`${row.bytesInOutput}\t${row.inputPath}`);
}
