---
sidebar_position: 1
---

# Introduction

**react-native-ultra-carousel** is the ultimate carousel ecosystem for React Native. It ships with 35+ animation presets, a plugin system, and full TypeScript support.

## Why Ultra Carousel?

| Feature | Ultra Carousel | snap-carousel | reanimated-carousel |
|---------|:---:|:---:|:---:|
| Animation presets | 35+ | 3 | 5 |
| TypeScript | Strict | Partial | Yes |
| Reanimated 3 | Yes | No | Yes |
| Plugin system | Yes | No | No |
| CLI tool | Yes | No | No |
| Active development | Yes | No | Yes |

## Architecture

Built on top of `react-native-reanimated` and `react-native-gesture-handler`, all animations run on the native UI thread at 60 FPS.

### Key Concepts

- **Presets** — Pre-built animation configurations (slide, fade, cube, coverflow, etc.)
- **Plugins** — Extend carousel behavior with custom logic
- **Themes** — 4 built-in visual themes + custom theme support
- **Hooks** — React hooks for carousel control and state

## Quick Links

- [Installation](/docs/getting-started/installation)
- [Quick Start](/docs/getting-started/quick-start)
- [All Presets](/docs/presets/overview)
- [API Reference](/docs/api/carousel-props)
