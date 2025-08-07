
import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [succes, setSucces] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log({ username, password })

    if (!username || !password) {
      setError("Todos los campos son obligatorios")
      return
    }

    const isLogin = await login(username, password)

    if (isLogin) {
        setUsername("")
      setPassword("")
      setError("")
      setSucces(`Bienvenido ${username}`)
      navigate("/")
    } else {
      setError("Usuario o Contraseña incorrecto")
      }
  }

  return (
    <Layout>
      <h1>Inicia sesión</h1>

      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <p>johnd, m38rmF$</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username} />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password} />
          </div>
          <button>Ingresar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {succes && <p style={{ color: "green" }}>{succes}</p>}
      </section>
    </Layout>
  )
}

export { Login }