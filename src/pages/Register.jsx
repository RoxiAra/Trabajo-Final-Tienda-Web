import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios")
      return
    }

    const newUser = {
      email,
      username,
      password,
      name: {
        firstname: "Nombre",
        lastname: "Apellido"
      },
      address: {
        city: "Ciudad",
        street: "Calle",
        number: 123,
        zipcode: "00000",
        geolocation: {
          lat: "0.0000",
          long: "0.0000"
        }
      },
      phone: "0000000000"
    }

    const result = await register(newUser)

    if (result.success) {
      setSuccess("Usuario registrado con éxito")
      setUsername("")
      setEmail("")
      setPassword("")
      navigate("/") 
    } else {
      setError("Error al registrar: " + result.error)
    }
  }

  return (
    <Layout>
      <h1>Registrate</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrar</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </section>
    </Layout>
  )
}

export { Register }
