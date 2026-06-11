import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { rapportSeance } from '../services/api'

type Presence = {
  id: string
  etudiant_id: string
  pointage_entree: string
  statut: string
}

export default function RapportScreen({ route }: any) {
  const { seance_id }             = route.params
  const [presences, setPresences] = useState<Presence[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    rapportSeance(seance_id)
      .then(data => setPresences(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [seance_id])

  if (loading) return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  )

  return (
    <View className="flex-1 bg-background px-6 pt-12">
      <Text className="text-3xl font-bold text-black mb-2">Rapport</Text>
      <Text className="text-gray-400 mb-6">Séance #{seance_id}</Text>

      <FlatList
        data={presences}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-100">
            <View className="flex-row justify-between items-center">
              <Text className="text-black font-semibold">Étudiant #{item.etudiant_id}</Text>
              <View className={`px-3 py-1 rounded-full ${
                item.statut === 'present' ? 'bg-success/10' : 'bg-danger/10'
              }`}>
                <Text className={`text-xs font-semibold ${
                  item.statut === 'present' ? 'text-success' : 'text-danger'
                }`}>
                  {item.statut}
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-sm mt-1">
              Entrée : {item.pointage_entree || 'N/A'}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">Aucune présence enregistrée</Text>
        }
      />
    </View>
  )
}