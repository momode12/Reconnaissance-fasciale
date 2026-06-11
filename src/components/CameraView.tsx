import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { CameraView as ExpoCameraView, useCameraPermissions } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'

type Props = {
  onCapture: (base64: string) => void
}

export default function CameraView({ onCapture }: Props) {
  const [permission, requestPermission] = useCameraPermissions()
  const [photo, setPhoto]               = useState<string | null>(null)
  const cameraRef                       = useRef<ExpoCameraView>(null)

  if (!permission?.granted) {
    return (
      <View className="items-center justify-center p-6">
        <Text className="text-gray-600 text-center mb-4">
          Permission caméra requise
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-primary rounded-xl px-6 py-3"
        >
          <Text className="text-white font-semibold">Autoriser</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const prendre = async () => {
    if (!cameraRef.current) return
    const pic = await cameraRef.current.takePictureAsync({ quality: 0.7 })
    if (!pic) return

    const manipulated = await ImageManipulator.manipulateAsync(
      pic.uri,
      [{ resize: { width: 640 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    )

    if (manipulated.base64) {
      setPhoto(manipulated.uri)
      onCapture(manipulated.base64)
    }
  }

  const reprendre = () => setPhoto(null)

  if (photo) {
    return (
      <View className="items-center">
        <Image
          source={{ uri: photo }}
          className="w-64 h-64 rounded-2xl mb-4"
        />
        <TouchableOpacity
          onPress={reprendre}
          className="bg-gray-200 rounded-xl px-6 py-3"
        >
          <Text className="text-gray-700 font-semibold">Reprendre</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="items-center">
      <ExpoCameraView
        ref={cameraRef}
        facing="front"
        className="w-64 h-64 rounded-2xl overflow-hidden mb-4"
      />
      <TouchableOpacity
        onPress={prendre}
        className="bg-primary rounded-full w-16 h-16 items-center justify-center"
      >
        <Text className="text-white text-2xl">📷</Text>
      </TouchableOpacity>
    </View>
  )
}