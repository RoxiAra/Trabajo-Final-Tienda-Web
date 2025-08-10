import "../styles/components/Footer.css"
import { useAuth } from "../context/UserContext"
import { Link } from "react-router-dom"

const Footer = () => {

  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }


  return (
    <footer>
      <section className="footer-seccion">
        <h2>Contacto</h2>
<ul>
          <li>Email: contacto@novamarket.com</li>
          <li>Numero: +5493885012820</li>
  <li>Instagram: nov@market</li>
</ul>
      </section>
      <section className="footer-seccion3">
        <h2>Enlaces Utiles</h2>
        <div className="footer-link">
          {user && (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/dashboard">Dashboard</Link>
                </>
              )}
              {!user && (
                <>
                  <Link  to="/login">Login</Link>
              <Link to="/register">Registrate</Link>
              <Link to="/">Home</Link>
                </>
              )}
        </div>
      </section>
      <section className="footer-seccion2">
        <p>Sitio desarrollado por <a href="https://www.linkedin.com/in/roc%C3%ADo-mikaela-aramayo-706652324/" target="_blank">Rocio Aramayo</a></p>
        <p>© 2025 Nova Market.Todos los derechos reservados.</p>
      </section>
    </footer>
  )
}

export { Footer }