/**
 * @file Carousel E2E tests
 * @description End-to-end tests for core carousel functionality
 */

import { device, element, by, expect } from 'detox';

describe('Carousel', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render carousel with items', async () => {
    await expect(element(by.id('carousel'))).toBeVisible();
    await expect(element(by.text('Slide 1'))).toBeVisible();
  });

  it('should swipe to next item', async () => {
    await element(by.id('carousel')).swipe('left');
    await expect(element(by.text('Slide 2'))).toBeVisible();
  });

  it('should swipe to previous item', async () => {
    await element(by.id('carousel')).swipe('left');
    await element(by.id('carousel')).swipe('right');
    await expect(element(by.text('Slide 1'))).toBeVisible();
  });

  it('should show pagination dots', async () => {
    await expect(element(by.id('pagination'))).toBeVisible();
  });

  it('should change preset', async () => {
    await element(by.text('fade')).tap();
    await expect(element(by.text('fade'))).toBeVisible();
  });

  it('should handle rapid swipes', async () => {
    await element(by.id('carousel')).swipe('left');
    await element(by.id('carousel')).swipe('left');
    await element(by.id('carousel')).swipe('left');
    await expect(element(by.text('Slide 4'))).toBeVisible();
  });
});
