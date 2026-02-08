---
sidebar_position: 3
title: Onboarding Flow
---

# Onboarding Flow

A multi-step onboarding screen with animated illustrations, progress dots, and a call-to-action button on the final step.

## Full Example

```tsx
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { UltraCarousel, UltraCarouselRef } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const steps: OnboardingStep[] = [
  {
    id: '1',
    icon: 'discover',
    title: 'Discover',
    description: 'Browse thousands of curated items from top creators around the world.',
    backgroundColor: '#FF6B6B',
  },
  {
    id: '2',
    icon: 'create',
    title: 'Create',
    description: 'Build your own collections and share them with the community.',
    backgroundColor: '#4ECDC4',
  },
  {
    id: '3',
    icon: 'connect',
    title: 'Connect',
    description: 'Follow creators, join groups, and collaborate on projects.',
    backgroundColor: '#45B7D1',
  },
  {
    id: '4',
    icon: 'launch',
    title: 'Get Started',
    description: 'Your journey begins now. Create your account and start exploring.',
    backgroundColor: '#96CEB4',
  },
];

export default function OnboardingScreen() {
  const carouselRef = useRef<UltraCarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastStep = activeIndex === steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      // Navigate to main app
      console.log('Onboarding complete!');
    } else {
      carouselRef.current?.next();
    }
  }, [isLastStep]);

  const handleSkip = useCallback(() => {
    // Navigate to main app
    console.log('Skipped onboarding');
  }, []);

  const renderItem = useCallback(({ item }: { item: OnboardingStep }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconPlaceholder}>{item.icon.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <UltraCarousel
        ref={carouselRef}
        data={steps}
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH * 1.2}
        preset="slide"
        snapEnabled
        onActiveIndexChange={setActiveIndex}
        pagination={{
          type: 'dot',
          activeColor: '#fff',
          inactiveColor: 'rgba(255,255,255,0.4)',
          size: 10,
          spacing: 8,
          position: 'bottom',
          offset: 30,
        }}
        renderItem={renderItem}
      />

      {/* Bottom controls */}
      <View style={styles.controls}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipButton} />
        )}

        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.nextButton,
            isLastStep && styles.getStartedButton,
          ]}
        >
          <Text style={styles.nextText}>
            {isLastStep ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconPlaceholder: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  skipButton: {
    width: 80,
    padding: 12,
  },
  skipText: {
    fontSize: 16,
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#333',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  getStartedButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 40,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```

## Key Features

- **Slide preset** for a familiar horizontal swipe experience
- **Dot pagination** shows progress through the onboarding steps
- **Skip button** allows users to bypass onboarding
- **Dynamic CTA** that changes from "Next" to "Get Started" on the last step
- **No loop** so users have a clear start and end

## Variations

### With Scale Transition

Use a scale preset for a more polished feel:

```tsx
<UltraCarousel
  data={steps}
  preset="fade-scale"
  presetConfig={{ minScale: 0.9, minOpacity: 0.5 }}
  renderItem={renderItem}
/>
```

### With Animated Progress Bar

Replace dots with a progress bar:

```tsx
<UltraCarousel
  data={steps}
  preset="slide"
  pagination={{
    type: 'progress',
    activeColor: '#fff',
    inactiveColor: 'rgba(255,255,255,0.3)',
    height: 4,
    width: SCREEN_WIDTH - 80,
    borderRadius: 2,
  }}
  renderItem={renderItem}
/>
```

### With Auto-Advance

Auto-advance through steps with a timer:

```tsx
<UltraCarousel
  data={steps}
  preset="slide"
  autoPlay
  autoPlayInterval={5000}
  pauseOnInteraction
  renderItem={renderItem}
/>
```
