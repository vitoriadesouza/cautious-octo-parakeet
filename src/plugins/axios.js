import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
  },
})

export async function is_authenticated() {
  try {
    const response = await api.get("/authentication")
    if (response.status === 200) {
      return { message: true }
    }
  } catch (error) {
    console.error("Erro de autenticação:", error.response?.data || error.message)
  }
  return { message: false }
}

(async () => {
  const result = await is_authenticated()
  console.log(result)
})()


