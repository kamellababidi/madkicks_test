import React from 'react';
import {
  View,
  TextInputProps,
  TextInput,
  StyleSheet,
} from 'react-native';

export interface InputFieldProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputType?: 'text' | 'email' | 'phone' | 'number' | 'date';
  disabled?: boolean;
}


const InputField = ({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  maxLength = 50,
  secureTextEntry = false,
  inputType = 'text',
  disabled = false,
  ...rest
}: InputFieldProps) => {


  let customKeyboardType: TextInputProps['keyboardType'] = keyboardType;
  let customMaxLength: number = maxLength;

  switch (inputType) {
    case 'email':
      customKeyboardType = 'email-address';
      break;
    case 'phone':
      customKeyboardType = 'phone-pad';
      customMaxLength = 15;
      break;
    case 'number':
      customKeyboardType = 'number-pad';
      break;
    case 'date':
      customKeyboardType = 'default';
      break;
  }

  return (
    <View style={[styles.container, disabled && styles.disabledInput]}>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={customKeyboardType}
        maxLength={customMaxLength}
        secureTextEntry={secureTextEntry}
        multiline={false}
        numberOfLines={1}
        returnKeyType="done"
        // scrollEnabled={false}
        allowFontScaling={false}
        editable={!disabled}
        {...rest}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  label: {
    color: 'black',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    paddingVertical: 10,
    height: 50,
  },
  dateInput: {
    justifyContent: 'center',
    height: 50,
  },
  placeholderText: {
    color: 'gray',
  },
  dateText: {
    textAlign: 'right',
  },
  datePickerText: {
    color: 'black',
  },
  disabledInput: {
    backgroundColor: 'black',
    color: 'gray',
  },
});


export default InputField;
