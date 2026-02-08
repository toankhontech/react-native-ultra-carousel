---
sidebar_position: 4
title: Instagram Stories
---

# Instagram Stories

An Instagram-style stories viewer with timed auto-advance, progress bars, and swipe-to-dismiss.

## Full Example

```tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { UltraCarousel, UltraCarouselRef } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds per story

interface Story {
  id: string;
  imageUri: string;
  username: string;
  avatarUri: string;
  timestamp: string;
}

const stories: Story[] = [
  {
    id: '1',
    imageUri: 'https://example.com/story-1.jpg',
    username: 'alex_travels',
    avatarUri: 'https://example.com/avatar-1.jpg',
    timestamp: '2h ago',
  },
  {
    id: '2',
    imageUri: 'https://example.com/story-2.jpg',
    username: 'alex_travels',
    avatarUri: 'https://example.com/avatar-1.jpg',
    timestamp: '2h ago',
  },
  {
    id: '3',
    imageUri: 'https://example.com/story-3.jpg',
    username: 'alex_travels',
    avatarUri: 'https://example.com/avatar-1.jpg',
    timestamp: '1h ago',
  },
  {
    id: '4',
    imageUri: 'https://example.com/story-4.jpg',
    username: 'alex_travels',
    avatarUri: 'https://example.com/avatar-1.jpg',
    timestamp: '30m ago',
  },
];

export default function StoriesViewer() {
  const carouselRef = useRef<UltraCarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useSharedValue(0);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    progress.value = 0;
    progress.value = withTiming(1, { duration: STORY_DURATION });

    const timer = setTimeout(() => {
      if (activeIndex < stories.length - 1) {
        carouselRef.current?.next();
      } else {
        // Close stories viewer
        console.log('All stories viewed');
      }
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const handlePressIn = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleTapLeft = useCallback(() => {
    if (activeIndex > 0) {
      carouselRef.current?.prev();
    }
  }, [activeIndex]);

  const handleTapRight = useCallback(() => {
    if (activeIndex < stories.length - 1) {
      carouselRef.current?.next();
    }
  }, [activeIndex]);

  const renderItem = useCallback(({ item }: { item: Story }) => (
    <View style={styles.storyContainer}>
      <Image
        source={{ uri: item.imageUri }}
        style={styles.storyImage}
        resizeMode="cover"
      />

      {/* Tap zones */}
      <View style={styles.tapZones}>
        <TouchableOpacity
          style={styles.tapLeft}
          onPress={handleTapLeft}
          onLongPress={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={styles.tapRight}
          onPress={handleTapRight}
          onLongPress={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        />
      </View>
    </View>
  ), [handleTapLeft, handleTapRight, handlePressIn, handlePressOut]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <UltraCarousel
        ref={carouselRef}
        data={stories}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        preset="cube"
        presetConfig={{
          perspective: 800,
          shadowEnabled: true,
          shadowOpacity: 0.3,
        }}
        enabled={false} // Disable swipe, use tap zones instead
        onActiveIndexChange={setActiveIndex}
        renderItem={renderItem}
      />

      {/* Progress bars */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBarBg}>
            <ProgressBar
              index={index}
              activeIndex={activeIndex}
              progress={progress}
            />
          </View>
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: stories[0].avatarUri }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{stories[0].username}</Text>
          <Text style={styles.timestamp}>
            {stories[activeIndex].timestamp}
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProgressBar({
  index,
  activeIndex,
  progress,
}: {
  index: number;
  activeIndex: number;
  progress: Animated.SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    let width = '0%';
    if (index < activeIndex) {
      width = '100%';
    } else if (index === activeIndex) {
      width = `${progress.value * 100}%`;
    }
    return { width };
  });

  return <Animated.View style={[styles.progressBarFill, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyContainer: {
    flex: 1,
  },
  storyImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  tapZones: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  tapLeft: {
    flex: 1,
  },
  tapRight: {
    flex: 2,
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  progressBarBg: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  timestamp: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginLeft: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
```

## Key Features

- **Cube preset** for the classic Instagram-style 3D transition between story groups
- **Progress bars** that fill over the story duration
- **Tap zones** -- tap left to go back, tap right to go forward
- **Long-press to pause** -- hold to pause the timer
- **Auto-advance** -- stories automatically move to the next after the timer expires
- **Gesture disabled** -- swiping is disabled in favor of tap navigation

## Variations

### With Slide Preset

For a simpler, flat transition:

```tsx
<UltraCarousel
  data={stories}
  preset="slide"
  renderItem={renderItem}
/>
```

### Multi-User Stories

To handle multiple users' stories (like the Instagram home row), nest this viewer inside a horizontal `FlatList` of user avatars, and launch the viewer when a user's avatar is tapped.

### With Reply Input

Add a text input at the bottom for story replies:

```tsx
<View style={styles.replyContainer}>
  <TextInput
    style={styles.replyInput}
    placeholder="Send a message..."
    placeholderTextColor="rgba(255,255,255,0.5)"
  />
  <TouchableOpacity style={styles.sendButton}>
    <Text style={styles.sendText}>Send</Text>
  </TouchableOpacity>
</View>
```
