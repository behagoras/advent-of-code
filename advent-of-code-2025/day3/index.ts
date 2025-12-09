import fs from 'node:fs/promises'; // async
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(
  fileURLToPath(import.meta.url),
);

const inputFile = path.resolve(__dirname, 'sample-input.txt')

const data = (await fs.readFile(inputFile, 'utf8')).split('\n');

function part1(input: string[]) {
  console.log({ input })
}

part1(data)
