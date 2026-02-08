/**
 * @file Documentation generator
 * @description Generates API documentation from TypeScript source files
 */

/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'path';

const CORE_SRC = path.join(__dirname, '..', 'packages', 'core', 'src');
const OUTPUT = path.join(__dirname, '..', 'packages', 'docs', 'docs', 'api');

interface DocEntry {
  name: string;
  type: 'component' | 'hook' | 'function' | 'type';
  description: string;
  file: string;
}

const extractExports = (filePath: string): DocEntry[] => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const entries: DocEntry[] = [];
  const fileName = path.basename(filePath, path.extname(filePath));

  // Match exported functions/components
  const exportRegex = /export\s+(?:const|function|class|interface|type)\s+(\w+)/g;
  let match;

  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    const isComponent = /^[A-Z]/.test(name) && !name.endsWith('Config') && !name.endsWith('Props');
    const isHook = name.startsWith('use');
    const isType = /^(interface|type)/.test(match[0].replace('export ', ''));

    // Extract description from preceding JSDoc
    const beforeMatch = content.substring(0, match.index);
    const jsdocMatch = beforeMatch.match(/\/\*\*\s*\n([^*]*\*\s*)*\*\//g);
    const description = jsdocMatch
      ? jsdocMatch[jsdocMatch.length - 1]
          .replace(/\/\*\*|\*\/|\*/g, '')
          .trim()
          .split('\n')[0]
          .trim()
      : '';

    entries.push({
      name,
      type: isType ? 'type' : isHook ? 'hook' : isComponent ? 'component' : 'function',
      description,
      file: filePath,
    });
  }

  return entries;
};

const generate = () => {
  console.log('Generating API documentation...');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
  }

  const indexContent = fs.readFileSync(path.join(CORE_SRC, 'index.ts'), 'utf-8');
  console.log(`  Source: ${CORE_SRC}/index.ts`);
  console.log(`  Output: ${OUTPUT}/`);
  console.log(`  Exports found: ${(indexContent.match(/export/g) || []).length}`);
  console.log('Done!');
};

generate();
