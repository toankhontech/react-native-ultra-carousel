/**
 * @file Code preview component
 * @description Displays a code snippet with syntax highlighting, line numbers, and copy support
 * @author toankhontech
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';

interface CodePreviewProps {
  /** The code string to display */
  code: string;
  /** Language label shown in the header (e.g. 'tsx', 'json') */
  language?: string;
  /** Whether to show a copy-to-clipboard button */
  showCopy?: boolean;
}

/**
 * Copies text to the clipboard using the best available API.
 * Falls back gracefully when running outside a web context or
 * when native clipboard access is unavailable.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // On native platforms we dynamically require the legacy RN Clipboard module
    // which is still bundled by default in React Native < 0.79.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Clipboard } = require('react-native');
    if (Clipboard?.setString) {
      Clipboard.setString(text);
      return true;
    }
  } catch {
    // Clipboard unavailable – swallow silently
  }
  return false;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  language = 'tsx',
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.languageBadge}>{language}</Text>
        {showCopy && (
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopy}
            activeOpacity={0.7}
          >
            <Text style={styles.copyText}>{copied ? 'Copied!' : 'Copy'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.codeContainer}>
          <View style={styles.lineNumbers}>
            {lines.map((_, index) => (
              <Text key={index} style={styles.lineNumber}>
                {index + 1}
              </Text>
            ))}
          </View>

          <View style={styles.codeLinesWrap}>
            {lines.map((line, index) => (
              <Text key={index} style={styles.codeLine}>
                {line || ' '}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

CodePreview.displayName = 'CodePreview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  languageBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  copyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  copyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
  },
  scrollContainer: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingVertical: 12,
    paddingRight: 14,
  },
  codeContainer: {
    flexDirection: 'row',
  },
  lineNumbers: {
    paddingLeft: 14,
    paddingRight: 12,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(255,255,255,0.06)',
    marginRight: 12,
  },
  lineNumber: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'right',
    minWidth: 20,
  },
  codeLinesWrap: {
    flexShrink: 1,
  },
  codeLine: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
    color: '#4ECDC4',
  },
});
