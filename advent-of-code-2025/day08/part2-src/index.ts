import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { part2 } from './main';
import { INPUT_FILE } from './constants';
const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = path.resolve(__dirname, INPUT_FILE);
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean)
console.log(part2(data));
