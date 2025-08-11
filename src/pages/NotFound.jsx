import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import "../styles/pages/NotFound.css"

const NotFound = () => {
  return (
    <Layout>
      <section className="seccion-not">
        <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <p>Verificá la URL o volvé al inicio.</p>
        <div className="link-not">
          <Link to="/">Ir a inicio</Link>
      </div>
      </section>
    </Layout>
  )
}

export { NotFound }