#!/usr/bin/env node
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
  .description('Bootstrap a new Advent of Code day')
  .requiredOption('--year <year>', 'The year (e.g., 2025)')
  .requiredOption('--day <day>', 'The day (e.g., 1)')
  .parse();

const options = program.opts();
const year = options.year;
const day = String(options.day).padStart(2, '0');
const dayLabel = `day${day}`;

const dayDir = path.resolve(process.cwd(), `advent-of-code-${year}`, dayLabel);

const templatePart1 = `import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day ${day} part 1, example output ->
const part1 = (sample-input: string[]) => {

}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\\n').filter(Boolean);
console.log(part1(data));
`;

const templatePart2 = `import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day ${day} part 2, example output ->
const part2 = (input: string[]) => {

}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\\n').filter(Boolean);
console.log(part2(data));
`;

const templateReadme = `# Day ${day}

## Part 1

`;

async function bootstrap() {
  try {
    // Create directory
    await fs.mkdir(dayDir, { recursive: true });
    console.log(`✓ Created directory: ${dayDir}`);

    // Create files
    await Promise.all([
      fs.writeFile(path.join(dayDir, 'part1.ts'), templatePart1),
      fs.writeFile(path.join(dayDir, 'part2.ts'), templatePart2),
      fs.writeFile(path.join(dayDir, 'README.md'), templateReadme),
      fs.writeFile(path.join(dayDir, 'input.txt'), ''),
      fs.writeFile(path.join(dayDir, 'sample-input.txt'), ''),
    ]);

    console.log(`✓ Created part1.ts`);
    console.log(`✓ Created part2.ts`);
    console.log(`✓ Created README.md`);
    console.log(`✓ Created input.txt`);
    console.log(`✓ Created sample-input.txt`);
    console.log(`\n✨ Bootstrap complete! Ready to solve Day ${day}.`);
  } catch (error) {
    console.error('Error bootstrapping day:', error);
    process.exit(1);
  }
}

bootstrap();
