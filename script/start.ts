#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';

// Read version from package.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
const version = packageJson.version || '1.0.0';

const program = new Command();

program
  .version(version)
  .description('Run a specific Advent of Code solution')
  .requiredOption('--year <year>', 'The year (e.g., 2025)')
  .requiredOption('--day <day>', 'The day (e.g., 1)')
  .requiredOption('--part <part>', 'The part (1 or 2)')
  .parse();

const options = program.opts();
const year = options.year;
const day = String(options.day).padStart(2, '0');
const part = options.part;

if (!['1', '2'].includes(part)) {
  console.error('Error: part must be 1 or 2');
  process.exit(1);
}

const dayLabel = `day${day}`;
const filePath = path.resolve(process.cwd(), `advent-of-code-${year}`, dayLabel, `part${part}.ts`);

const child = spawn('node', ['--import', 'tsx', filePath], {
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error('Error running script:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
