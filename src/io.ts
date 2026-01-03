import fs from "fs";
import readline from "readline";

export async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    process.stdin.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", (err) => reject(err));
  });
}

export function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export async function promptHidden(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  const onData = (char: Buffer) => {
    const str = char.toString();
    if (str === "\n" || str === "\r" || str === "\u0004") {
      process.stderr.write("\n");
    } else {
      process.stderr.write("*");
    }
  };
  process.stdin.on("data", onData);

  const value = await new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => resolve(answer));
  });

  process.stdin.removeListener("data", onData);
  rl.close();
  return value.trim();
}

export async function promptText(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  const value = await new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => resolve(answer));
  });
  rl.close();
  return value.trim();
}
