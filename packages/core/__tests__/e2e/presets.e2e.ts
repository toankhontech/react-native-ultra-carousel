/**
 * @file Animation preset E2E tests
 * @description Tests for individual animation presets
 */

import { device, element, by, expect } from 'detox';

const PRESETS_TO_TEST = ['slide', 'fade', 'coverflow', 'cube', 'tinder', 'stack', 'newspaper', 'wave'];

describe('Animation Presets', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  PRESETS_TO_TEST.forEach((preset) => {
    it(`should render ${preset} preset without crashing`, async () => {
      // Select the preset
      await element(by.text(preset)).tap();

      // Verify carousel is still visible
      await expect(element(by.id('carousel'))).toBeVisible();

      // Swipe to test animation runs without crash
      await element(by.id('carousel')).swipe('left');
      await element(by.id('carousel')).swipe('right');
    });
  });
});
