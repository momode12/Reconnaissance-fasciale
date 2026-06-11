import React, { useState } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  label:    string
  error?:   string
}

export default function Input({ label, error, ...props }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <View className="mb-4">
      <Text className="text-gray-600 text-sm font-medium mb-1">{label}</Text>
      <TextInput
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          bg-white border rounded-xl px-4 py-3 text-gray-800 text-base
          ${focused ? 'border-primary' : 'border-gray-200'}
          ${error  ? 'border-danger'  : ''}
        `}
        placeholderTextColor="#9CA3AF"
      />
      {error && <Text className="text-danger text-xs mt-1">{error}</Text>}
    </View>
  )
}