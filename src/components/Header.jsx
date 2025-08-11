import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"


const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" id="nav-menu" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Nova Market</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {user && (
                <>
                  <Link className="nav-link active" to="/">Home</Link>
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  <Link className="nav-link" to="/aboutus">About us</Link>
                  <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar sesión</button>
                </>
              )}
              {!user && (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/register">Registrate</Link>
                  <Link className="nav-link" to="/aboutus">About us</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }