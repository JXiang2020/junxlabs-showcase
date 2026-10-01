import { copyFile, lstat, mkdir, realpath, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = await realpath(fileURLToPath(new URL("../", import.meta.url)));
const output = path.join(root, "dist");

// Explicit public files only: never recursively copy the repository or assets tree.
const publicFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/favicon/original-site-favicon.svg",
  "assets/docs/AI_Powered_Workflow_System_V6.pdf",
  "assets/images/agent-harness-architecture.png",
  "assets/images/system-overview.png",
  "assets/video/dbm201-course-production-demo.mp4"
];

// Reject redirected inputs and output before deleting the generated directory.
for (const file of publicFiles) {
  const source = path.join(root, file);
  if (await realpath(source) !== source || !(await lstat(source)).isFile()) {
    throw new Error(`Public asset must be a regular file inside the repository: ${file}`);
  }
}
const existingOutput = await lstat(output).catch((error) => {
  if (error.code !== "ENOENT") throw error;
});
if (path.dirname(output) !== root || (existingOutput && !existingOutput.isDirectory())) {
  throw new Error("Refusing to replace an unexpected dist path");
}

// Rebuild from scratch so stale or accidentally placed files cannot be published.
await rm(output, { recursive: true, force: true });
for (const file of publicFiles) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, file), destination);
}
console.log(`Public deployment assets (${publicFiles.length} files in dist/):\n${publicFiles.join("\n")}`);
