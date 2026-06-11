import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://192.168.1.104:5000'

const getToken = async () => {
  return await AsyncStorage.getItem('token')
}

const headers = async (withAuth = true) => {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (withAuth) {
    const token = await getToken()
    if (token) h['Authorization'] = `Bearer ${token}`
  }
  return h
}

// AUTH
export const login = async (email: string, mot_de_passe: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: await headers(false),
    body: JSON.stringify({ email, mot_de_passe })
  })
  return res.json()
}

export const register = async (
  nom: string, prenom: string, email: string,
  mot_de_passe: string, role: string, image_base64: string
) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: await headers(false),
    body: JSON.stringify({ nom, prenom, email, mot_de_passe, role, image_base64 })
  })
  return res.json()
}

// FACE
export const enregistrerVisage = async (utilisateur_id: number, image_base64: string) => {
  const res = await fetch(`${BASE_URL}/face/enregistrer`, {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify({ utilisateur_id, image_base64 })
  })
  return res.json()
}

export const identifierVisage = async (image_base64: string) => {
  const res = await fetch(`${BASE_URL}/face/identifier`, {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify({ image_base64 })
  })
  return res.json()
}

// SEANCES
export const listerSeances = async () => {
  const res = await fetch(`${BASE_URL}/seances/`, {
    method: 'GET',
    headers: await headers()
  })
  return res.json()
}

export const creerSeance = async (
  professeur_id: number, matiere: string,
  date_seance: string, heure_debut: string,
  heure_fin: string, salle?: string
) => {
  const res = await fetch(`${BASE_URL}/seances/`, {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify({ professeur_id, matiere, date_seance, heure_debut, heure_fin, salle })
  })
  return res.json()
}

// PRESENCES
export const pointer = async (seance_id: number, etudiant_id: number) => {
  const res = await fetch(`${BASE_URL}/presences/pointer`, {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify({ seance_id, etudiant_id })
  })
  return res.json()
}

export const rapportSeance = async (seance_id: number) => {
  const res = await fetch(`${BASE_URL}/presences/${seance_id}`, {
    method: 'GET',
    headers: await headers()
  })
  return res.json()
}