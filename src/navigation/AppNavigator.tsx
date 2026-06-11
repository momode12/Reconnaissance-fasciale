import React                              from 'react'
import { NavigationContainer }            from '@react-navigation/native'
import { createStackNavigator }           from '@react-navigation/stack'
import { ActivityIndicator, View }        from 'react-native'
import { useAuth }                        from '../context/AuthContext'
import LoginScreen                        from '../screens/LoginScreen'
import RegisterScreen                     from '../screens/RegisterScreen'
import PointageScreen                     from '../screens/PointageScreen'
import SeancesScreen                      from '../screens/SeancesScreen'
import RapportScreen                      from '../screens/RapportScreen'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const { user, loading } = useAuth()

  if (loading) return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login"    component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === 'etudiant' ? (
          <Stack.Screen name="Pointage" component={PointageScreen} />
        ) : (
          <>
            <Stack.Screen name="Seances" component={SeancesScreen} />
            <Stack.Screen name="Rapport" component={RapportScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}