const fs = require("fs");
const path = require("path");

const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");

let front = readme.slice(0, readme.indexOf("<!-- BEGIN-AUTO-LIST -->"));

const contributions = fs
  .readdirSync(path.join(__dirname, "..", "contributions"))
  .filter((file) => file.endsWith(".json"))
  .map((file) => require(path.join(__dirname, "..", "contributions", file)));

const list = contributions
  .map(
    (contribution) => `### [${contribution.title}](${contribution.url})

${contribution.description}`
  )
  .join("\n\n");

const newReadme = `${front}<!-- BEGIN-AUTO-LIST -->

${list}

<!-- END-AUTO-LIST -->`;

console.log("Updated README.md");
console.log(newReadme);
fs.writeFileSync(path.join(__dirname, "..", "README.md"), newReadme);
