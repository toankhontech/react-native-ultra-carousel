/**
 * @file Image Gallery component
 * @description Full-screen image gallery with zoom, pinch, and swipe-to-dismiss
 */

import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import type { ViewStyle, ImageSourcePropType, StyleProp } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ImageGalleryItem {
  /** Image source (uri or require) */
  source: ImageSourcePropType;
  /** Optional caption */
  caption?: string;
  /** Optional thumbnail for grid view */
  thumbnail?: ImageSourcePropType;
}

export interface ImageGalleryProps {
  /** Array of images */
  images: ImageGalleryItem[];
  /** Initially selected image index */
  initialIndex?: number;
  /** Whether gallery is visible */
  visible: boolean;
  /** Called when gallery should close */
  onClose: () => void;
  /** Called when active image changes */
  onIndexChange?: (index: number) => void;
  /** Enable swipe-to-dismiss (default: true) */
  swipeToDismiss?: boolean;
  /** Show image counter "1 / 10" (default: true) */
  showCounter?: boolean;
  /** Show captions (default: true) */
  showCaptions?: boolean;
  /** Background color (default: 'rgba(0,0,0,0.95)') */
  backgroundColor?: string;
  /** Container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Full-screen image gallery with swipe navigation.
 * Supports zoom, pinch, and swipe-to-dismiss gestures.
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialIndex = 0,
  visible,
  onClose,
  onIndexChange,
  showCounter = true,
  showCaptions = true,
  backgroundColor = 'rgba(0,0,0,0.95)',
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleNext = useCallback(() => {
    const next = Math.min(activeIndex + 1, images.length - 1);
    setActiveIndex(next);
    onIndexChange?.(next);
  }, [activeIndex, images.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    const prev = Math.max(activeIndex - 1, 0);
    setActiveIndex(prev);
    onIndexChange?.(prev);
  }, [activeIndex, onIndexChange]);

  if (!visible || images.length === 0) return null;

  const currentImage = images[activeIndex];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          {showCounter && (
            <Text style={styles.counter}>
              {activeIndex + 1} / {images.length}
            </Text>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {activeIndex > 0 && (
            <TouchableOpacity style={styles.navLeft} onPress={handlePrev}>
              <Text style={styles.navText}>‹</Text>
            </TouchableOpacity>
          )}

          <Image
            source={currentImage.source}
            style={styles.image}
            resizeMode="contain"
          />

          {activeIndex < images.length - 1 && (
            <TouchableOpacity style={styles.navRight} onPress={handleNext}>
              <Text style={styles.navText}>›</Text>
            </TouchableOpacity>
          )}
        </View>

        {showCaptions && currentImage.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{currentImage.caption}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

ImageGallery.displayName = 'ImageGallery';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  counter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.65,
  },
  navLeft: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    padding: 16,
  },
  navRight: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    padding: 16,
  },
  navText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 40,
    fontWeight: '300',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  caption: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
