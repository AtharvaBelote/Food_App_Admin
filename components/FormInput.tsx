import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { KeyboardTypeOptions } from 'react-native';
import { colors } from '../constants/colors';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const FormInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      mode="outlined"
      style={styles.input}
      activeOutlineColor={colors.primary}
      outlineColor="black"
      dense
      outlineStyle={{ borderRadius: 30 }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 50,
  },
});

export default FormInput;