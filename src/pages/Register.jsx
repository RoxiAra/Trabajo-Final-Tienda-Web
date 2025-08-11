import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/Register.css"

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
      <section className="seccion-register">
        <h1>Regístrate</h1>
      <section className="seccion-form">
        <form onSubmit={handleSubmit} className="form-register">
          <div className="form-username">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-email">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-contraseña">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Regístrar</button>
          </form>
          <div className="div-error">
            {error && <p>{error}</p>}
          </div>
          <div className="div-succes">
            {success && <p>{success}</p>}
          </div>
      </section>
      </section>
    </Layout>
  )
}

export { Register }
