import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { part1 } from './main';
const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = path.resolve(__dirname, '../sample-input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean)
console.log(part1(data));
