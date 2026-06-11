import React, { useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { register }   from '../services/api'
import Input          from '../components/Input'
import Button         from '../components/Button'
import CameraCapture  from '../components/CameraView'

export default function RegisterScreen({ navigation }: any) {
  const [nom, setNom]         = useState('')
  const [prenom, setPrenom]   = useState('')
  const [email, setEmail]     = useState('')
  const [mdp, setMdp]         = useState('')
  const [role, setRole]       = useState<'etudiant' | 'professeur'>('etudiant')
  const [photo, setPhoto]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !mdp || !photo)
      return Alert.alert('Erreur', 'Remplis tous les champs et prends une photo')

    setLoading(true)
    try {
      const data = await register(nom, prenom, email, mdp, role, photo)
      if (data.id) {
        Alert.alert('Succès', 'Compte créé, en attente d\'activation')
        navigation.navigate('Login')
      } else {
        Alert.alert('Erreur', data.error || 'Inscription échouée')
      }
    } catch {
      Alert.alert('Erreur', 'Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-6 pt-12 pb-10">
        <Text className="text-3xl font-bold text-black mb-2">Inscription</Text>
        <Text className="text-gray-400 mb-8">Créer votre compte</Text>

        <Input label="Nom"    value={nom}    onChangeText={setNom}    placeholder="Rakoto" />
        <Input label="Prénom" value={prenom} onChangeText={setPrenom} placeholder="Jean" />
        <Input label="Email"  value={email}  onChangeText={setEmail}
          keyboardType="email-address" autoCapitalize="none" placeholder="email@exemple.com" />
        <Input label="Mot de passe" value={mdp} onChangeText={setMdp}
          secureTextEntry placeholder="••••••••" />

        {/* Sélection rôle */}
        <Text className="text-gray-600 text-sm font-medium mb-2">Rôle</Text>
        <View className="flex-row gap-3 mb-6">
          {(['etudiant', 'professeur'] as const).map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              className={`flex-1 py-3 rounded-xl items-center border
                ${role === r ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
            >
              <Text className={role === r ? 'text-white font-semibold' : 'text-gray-600'}>
                {r === 'etudiant' ? 'Étudiant' : 'Professeur'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Caméra */}
        <Text className="text-gray-600 text-sm font-medium mb-3">Photo du visage</Text>
        <View className="items-center mb-6 bg-white rounded-2xl p-4">
          <CameraCapture onCapture={setPhoto} />
        </View>

        <Button title="S'inscrire" onPress={handleRegister} loading={loading} />
      </View>
    </ScrollView>
  )
}