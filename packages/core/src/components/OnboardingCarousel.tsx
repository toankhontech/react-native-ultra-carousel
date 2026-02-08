/**
 * @file Onboarding Carousel component
 * @description Step-by-step onboarding flow with progress indicator, skip, and done
 */

import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface OnboardingStep {
  /** Unique key for the step */
  key: string;
  /** Render the step content */
  render: () => React.ReactNode;
}

export interface OnboardingCarouselProps {
  /** Array of onboarding steps */
  steps: OnboardingStep[];
  /** Called when user completes onboarding */
  onDone: () => void;
  /** Called when user skips onboarding */
  onSkip?: () => void;
  /** Text for the skip button (default: 'Skip') */
  skipText?: string;
  /** Text for the next button (default: 'Next') */
  nextText?: string;
  /** Text for the done button (default: 'Get Started') */
  doneText?: string;
  /** Show skip button (default: true) */
  showSkip?: boolean;
  /** Active dot color (default: '#333') */
  activeDotColor?: string;
  /** Inactive dot color (default: '#ccc') */
  inactiveDotColor?: string;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Button text style */
  buttonTextStyle?: StyleProp<TextStyle>;
}

/**
 * Onboarding carousel with step progress, skip, and done controls.
 */
export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  steps,
  onDone,
  onSkip,
  skipText = 'Skip',
  nextText = 'Next',
  doneText = 'Get Started',
  showSkip = true,
  activeDotColor = '#333',
  inactiveDotColor = '#ccc',
  style,
  buttonTextStyle,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      onDone();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isLastStep, onDone]);

  const handleSkip = useCallback(() => {
    onSkip?.() ?? onDone();
  }, [onSkip, onDone]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {steps[currentStep].render()}
      </View>

      <View style={styles.dots}>
        {steps.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === currentStep ? activeDotColor : inactiveDotColor,
                width: i === currentStep ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        {showSkip && !isLastStep ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, buttonTextStyle]}>{skipText}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipButton} />
        )}

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                backgroundColor: activeDotColor,
              },
            ]}
          />
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={[styles.nextText, buttonTextStyle]}>
            {isLastStep ? doneText : nextText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

OnboardingCarousel.displayName = 'OnboardingCarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  skipButton: {
    width: 80,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  nextButton: {
    width: 110,
    alignItems: 'flex-end',
  },
  nextText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
});
