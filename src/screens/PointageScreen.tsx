import React, { useState } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import { identifierVisage, pointer } from '../services/api'
import { useAuth }                   from '../context/AuthContext'
import CameraCapture                 from '../components/CameraView'
import Button                        from '../components/Button'

export default function PointageScreen() {
  const { user }                    = useAuth()
  const [photo, setPhoto]           = useState<string | null>(null)
  const [loading, setLoading]       = useState(false)
  const [resultat, setResultat]     = useState<string | null>(null)

  const SEANCE_ID = 1 // à remplacer par sélection dynamique

  const handlePointage = async () => {
    if (!photo) return Alert.alert('Erreur', 'Prends une photo d\'abord')
    setLoading(true)
    setResultat(null)
    try {
      const identification = await identifierVisage(photo)
      if (!identification.utilisateur_id) {
        setResultat('Visage non reconnu')
        return
      }
      const presence = await pointer(SEANCE_ID, identification.utilisateur_id)
      setResultat(presence.message || 'Présence enregistrée')
    } catch {
      Alert.alert('Erreur', 'Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-6 pt-12">
        <Text className="text-3xl font-bold text-black mb-2">Pointage</Text>
        <Text className="text-gray-400 mb-8">Reconnaissance faciale automatique</Text>

        <View className="bg-white rounded-2xl p-4 mb-6 items-center">
          <CameraCapture onCapture={setPhoto} />
        </View>

        <Button
          title="Pointer ma présence"
          onPress={handlePointage}
          loading={loading}
          disabled={!photo}
        />

        {resultat && (
          <View className={`mt-6 p-4 rounded-xl ${
            resultat.includes('enregistrée') ? 'bg-success/10' : 'bg-danger/10'
          }`}>
            <Text className={`text-center font-semibold ${
              resultat.includes('enregistrée') ? 'text-success' : 'text-danger'
            }`}>
              {resultat}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}