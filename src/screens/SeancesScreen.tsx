import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { listerSeances } from '../services/api'

type Seance = {
  id: number
  matiere: string
  date_seance: string
  heure_debut: string
  heure_fin: string
  salle: string
}

export default function SeancesScreen({ navigation }: any) {
  const [seances, setSeances]   = useState<Seance[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    listerSeances()
      .then(data => setSeances(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  )

  return (
    <View className="flex-1 bg-background px-6 pt-12">
      <Text className="text-3xl font-bold text-black mb-2">Séances</Text>
      <Text className="text-gray-400 mb-6">Liste des cours</Text>

      <FlatList
        data={seances}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Rapport', { seance_id: item.id })}
            className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
          >
            <Text className="text-black font-semibold text-lg">{item.matiere}</Text>
            <Text className="text-gray-400 text-sm mt-1">{item.date_seance}</Text>
            <View className="flex-row justify-between mt-2">
              <Text className="text-primary text-sm">
                {item.heure_debut} → {item.heure_fin}
              </Text>
              <Text className="text-gray-400 text-sm">{item.salle || 'Salle N/A'}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">Aucune séance disponible</Text>
        }
      />
    </View>
  )
}