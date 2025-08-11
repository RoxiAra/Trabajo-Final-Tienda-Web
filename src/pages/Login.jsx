
import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import "../styles/pages/login.css"

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
      <section className="seccion-entera">
        <section className="login-inicio">
          <h1>Inicia Sesión</h1>
          </section>
          <section className="seccion-usuario-prueba">
            <h2>Usuario de Prueba</h2>
          <p>Usuario: mor_2314</p>
          <p>Contaseña: 83r5^_</p>
          </section>
          <section className="seccion-formulario">
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
          </section>
          <div className="div-error">
            {error && <p>{error}</p>}
          </div>
          <div className="div-succes">
            {succes && <p>{succes}</p>}
          </div>
      </section>
    </Layout>
  )
}

export { Login }