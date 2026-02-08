/**
 * @file Props editor component
 * @description Interactive editor for adjusting carousel props via sliders, switches, and chip selectors
 * @author toankhontech
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NumberPropDef {
  name: string;
  type: 'number';
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

interface BooleanPropDef {
  name: string;
  type: 'boolean';
  label?: string;
  defaultValue: boolean;
}

interface SelectPropDef {
  name: string;
  type: 'select';
  label?: string;
  options: string[];
  defaultValue: string;
}

export type PropDefinition = NumberPropDef | BooleanPropDef | SelectPropDef;

/** Current values for every defined property, keyed by name. */
export type PropValues = Record<string, number | boolean | string>;

interface PropsEditorProps {
  /** Array of property definitions describing the controls to render. */
  config: PropDefinition[];
  /** Current values object – keys correspond to `PropDefinition.name`. */
  values: PropValues;
  /** Called whenever a value changes with the property name and new value. */
  onChange: (name: string, value: number | boolean | string) => void;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Stepper row for numeric properties (- / value / +). */
const NumberControl: React.FC<{
  def: NumberPropDef;
  value: number;
  onChange: (name: string, value: number) => void;
}> = ({ def, value, onChange }) => {
  const { name, label, min = 0, max = 100, step = 1 } = def;

  const decrement = useCallback(() => {
    onChange(name, Math.max(min, value - step));
  }, [name, value, min, step, onChange]);

  const increment = useCallback(() => {
    onChange(name, Math.min(max, value + step));
  }, [name, value, max, step, onChange]);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label ?? name}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepBtn} onPress={decrement} activeOpacity={0.7}>
          <Text style={styles.stepBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.stepValue}>{value}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={increment} activeOpacity={0.7}>
          <Text style={styles.stepBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/** Toggle switch row for boolean properties. */
const BooleanControl: React.FC<{
  def: BooleanPropDef;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
}> = ({ def, value, onChange }) => {
  const { name, label } = def;

  const toggle = useCallback(() => {
    onChange(name, !value);
  }, [name, value, onChange]);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label ?? name}</Text>
      <TouchableOpacity
        style={[styles.toggle, value && styles.toggleActive]}
        onPress={toggle}
        activeOpacity={0.7}
      >
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </TouchableOpacity>
    </View>
  );
};

/** Chip selector for select (enum) properties. */
const SelectControl: React.FC<{
  def: SelectPropDef;
  value: string;
  onChange: (name: string, value: string) => void;
}> = ({ def, value, onChange }) => {
  const { name, label, options } = def;

  return (
    <View style={styles.selectRow}>
      <Text style={styles.label}>{label ?? name}</Text>
      <View style={styles.chips}>
        {options.map((option) => {
          const isActive = option === value;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onChange(name, option)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const PropsEditor: React.FC<PropsEditorProps> = ({ config, values, onChange }) => {
  return (
    <View style={styles.container}>
      {config.map((def) => {
        const key = def.name;

        switch (def.type) {
          case 'number':
            return (
              <NumberControl
                key={key}
                def={def}
                value={(values[key] as number) ?? def.defaultValue}
                onChange={onChange}
              />
            );
          case 'boolean':
            return (
              <BooleanControl
                key={key}
                def={def}
                value={(values[key] as boolean) ?? def.defaultValue}
                onChange={onChange}
              />
            );
          case 'select':
            return (
              <SelectControl
                key={key}
                def={def}
                value={(values[key] as string) ?? def.defaultValue}
                onChange={onChange}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

PropsEditor.displayName = 'PropsEditor';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  selectRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },

  // -- Number stepper --
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  stepValue: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  // -- Boolean toggle --
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#1a1a2e',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },

  // -- Select chips --
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  chipActive: {
    backgroundColor: '#1a1a2e',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  chipTextActive: {
    color: '#fff',
  },
});
