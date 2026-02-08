/**
 * @file preview command
 * @description Launches a local preview server to demo all presets
 */

import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

interface PreviewOptions {
  port?: string;
}

export const previewCommand = (options: PreviewOptions): void => {
  const port = options.port || '8081';
  const playgroundDir = path.resolve(__dirname, '..', '..', '..', 'playground');

  if (!fs.existsSync(playgroundDir)) {
    console.log(chalk.red('\n  Playground app not found.'));
    console.log(chalk.dim('  Run from the monorepo root, or install the playground package.\n'));
    return;
  }

  console.log(chalk.bold('\n  Starting Ultra Carousel Preview...\n'));
  console.log(chalk.dim(`  Port: ${port}`));
  console.log(chalk.dim(`  Directory: ${playgroundDir}\n`));

  try {
    execSync(`npx expo start --port ${port} --web`, {
      cwd: playgroundDir,
      stdio: 'inherit',
    });
  } catch {
    console.log(chalk.yellow('\n  Preview server stopped.\n'));
  }
};
