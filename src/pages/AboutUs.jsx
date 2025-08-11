import { Layout } from "../components/Layout"
import "../styles/pages/aboutus.css"

const AboutUs = () => {
  return (
    <Layout>
      <section className="seccion-about">
        <h1>Sobre Nosotros</h1>
        <section className="seccion-about-grid">
          <section className="seccion-about-proyec">
          <h2>¿De qué trata el proyecto?</h2>
          <p>Nova Market es una tienda virtual ficticia creada con fines educativos, como parte de un proyecto de desarrollo web. Su objetivo es simular la experiencia de compra en línea, permitiendo visualizar el catálogo, explorar productos, realizar búsquedas dinámicas y utilizar un sistema básico de inicio de sesión o registro. Esto último permite, en caso de estar autenticado, modificar o eliminar productos.
          Aunque los productos y datos provienen de una API de prueba, la interfaz y las funcionalidades han sido diseñadas para asemejarse a las de una tienda real.</p>
          </section>
        <section className="seccion-about-dirigido">
          <h2>¿A quién está dirigido?</h2>
      <p>Esta aplicación está dirigida a estudiantes y desarrolladores que deseen aprender y practicar React junto con tecnologías modernas de desarrollo web. También puede servir como referencia para la implementación de funcionalidades comunes en proyectos de e-commerce, como la exploración de productos, el registro de usuarios, el inicio de sesión y la gestión del catálogo. De esta manera, ofrece una experiencia integral que abarca desde la navegación básica hasta la administración de contenido.</p>
      </section>
        <section className="seccion-about-tecnologi">
          <h2>Qué tecnologías o enfoques se usaron</h2>
          <ul>
            <li>Frontend: React 19 con React Router DOM y Vite, para una arquitectura modular y un rendimiento óptimo.</li>
            <li>Estilos: CSS moderno utilizando variables, Grid y Flexbox, con diseño responsive para adaptarse a distintos dispositivos.</li>
            <li>APIs: Integración con FakeStoreAPI para obtener productos, registrar usuarios y manejar la autenticación.</li>
            <li>Enfoques: Uso de componentes funcionales, Hooks para el manejo del estado, Context API para la gestión global de la autenticación, y formularios controlados con validación en tiempo real.</li>
          </ul>
      </section>
        </section>
      </section>
    </Layout>
  )
}

export { AboutUs }