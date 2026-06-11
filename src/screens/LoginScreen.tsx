import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { login }   from '../services/api'
import Input       from '../components/Input'
import Button      from '../components/Button'

export default function LoginScreen({ navigation }: any) {
  const { saveUser }          = useAuth()
  const [email, setEmail]     = useState('')
  const [mdp, setMdp]         = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !mdp) return Alert.alert('Erreur', 'Remplis tous les champs')
    setLoading(true)
    try {
      const data = await login(email, mdp)
      if (data.token) {
        await saveUser({ id: data.user_id, role: data.role, token: data.token })
        navigation.replace(data.role === 'etudiant' ? 'Pointage' : 'Seances')
      } else {
        Alert.alert('Erreur', data.error || 'Identifiants invalides')
      }
    } catch {
      Alert.alert('Erreur', 'Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-20">
        <Text className="text-3xl font-bold text-black mb-2">Connexion</Text>
        <Text className="text-gray-400 mb-10">Système de présence facial</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="email@exemple.com"
        />
        <Input
          label="Mot de passe"
          value={mdp}
          onChangeText={setMdp}
          secureTextEntry
          placeholder="••••••••"
        />

        <Button title="Se connecter" onPress={handleLogin} loading={loading} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="mt-6 items-center"
        >
          <Text className="text-gray-400">
            Pas de compte ?
            <Text className="text-primary font-semibold"> S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}