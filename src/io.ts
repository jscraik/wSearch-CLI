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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stderr,
    terminal: true
  });
  const rlAny = rl as unknown as {
    output: NodeJS.WritableStream;
    _writeToOutput?: (text: string) => void;
  };
  const output = rlAny.output;

  rlAny._writeToOutput = (text: string) => {
    if (text === "\n" || text === "\r") {
      output.write(text);
      return;
    }
    if (text === "\b \b") {
      output.write(text);
      return;
    }
    output.write("*");
  };

  try {
    const value = await new Promise<string>((resolve) => {
      rl.question(prompt, (answer) => resolve(answer));
    });
    return value.trim();
  } finally {
    rl.close();
  }
}

export async function promptText(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  const value = await new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => resolve(answer));
  });
  rl.close();
  return value.trim();
}
