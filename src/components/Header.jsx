import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header style={{ backgroundColor: "lightblue" }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Nova Market</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                { user && <>
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </>
              }
              {
                !user && <>
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  <Link className="nav-link active" aria-current="page" to="/register">Registrate</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }