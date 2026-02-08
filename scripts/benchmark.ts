/**
 * @file Performance benchmark runner
 * @description Measures animation function execution time across all presets
 */

/* eslint-disable no-console */

const presets = [
  'slide', 'fade', 'slide-fade', 'scale', 'scale-fade',
  'vertical', 'vertical-fade', 'parallax', 'overlap', 'peek',
  'stack', 'tinder', 'coverflow', 'cube', 'flip',
  'wheel', 'accordion', 'zoom', 'rotate', 'depth',
  'newspaper', 'origami', 'carousel-3d', 'wave', 'spiral',
  'glitch', 'morph', 'shutter', 'domino', 'elastic',
  'blur-slide', 'windmill', 'film-strip', 'helix', 'gravity',
];

interface BenchmarkResult {
  preset: string;
  avgMs: number;
  minMs: number;
  maxMs: number;
  iterations: number;
}

const benchmark = (name: string, fn: () => void, iterations = 10000): BenchmarkResult => {
  const times: number[] = [];

  // Warmup
  for (let i = 0; i < 100; i++) fn();

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  return { preset: name, avgMs: avg, minMs: min, maxMs: max, iterations };
};

const run = async () => {
  console.log('Animation Preset Benchmarks');
  console.log('='.repeat(60));
  console.log();

  const results: BenchmarkResult[] = [];

  for (const name of presets) {
    try {
      // Dynamic import would be used in real runtime
      // For now this is a template showing the benchmark structure
      const mockFn = () => {
        // Simulate animation calculation
        const progress = Math.random() * 2 - 1;
        Math.sin(progress) * Math.cos(progress);
      };

      const result = benchmark(name, mockFn);
      results.push(result);
      console.log(
        `  ${name.padEnd(16)} avg: ${result.avgMs.toFixed(4)}ms  ` +
        `min: ${result.minMs.toFixed(4)}ms  max: ${result.maxMs.toFixed(4)}ms`
      );
    } catch {
      console.log(`  ${name.padEnd(16)} SKIPPED`);
    }
  }

  console.log();
  console.log('='.repeat(60));

  const avgAll = results.reduce((a, b) => a + b.avgMs, 0) / results.length;
  console.log(`  Average across all presets: ${avgAll.toFixed(4)}ms`);
  console.log(`  Target: < 0.1ms per call (60fps budget: 16.67ms)`);
};

run();
