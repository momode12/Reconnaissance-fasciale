import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

type Props = {
  title:     string
  onPress:   () => void
  loading?:  boolean
  variant?:  'primary' | 'danger' | 'success' | 'outline'
  disabled?: boolean
}

const variants = {
  primary: 'bg-primary',
  danger:  'bg-danger',
  success: 'bg-success',
  outline: 'bg-white border border-primary',
}

const textVariants = {
  primary: 'text-white',
  danger:  'text-white',
  success: 'text-white',
  outline: 'text-primary',
}

export default function Button({
  title, onPress, loading = false,
  variant = 'primary', disabled = false
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        rounded-xl py-4 px-6 items-center justify-center
        ${disabled || loading ? 'opacity-50' : 'opacity-100'}
      `}
    >
      {loading
        ? <ActivityIndicator color={variant === 'outline' ? '#4F46E5' : '#fff'} />
        : <Text className={`${textVariants[variant]} font-semibold text-base`}>{title}</Text>
      }
    </TouchableOpacity>
  )
}