import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { SearchBar } from "../components/SearchBar"
import imagendebanner from "../assets/imagendebanner.png"
import "../styles/pages/home.css"
import enviosatodoelpais from "../assets/enviosatodoelpais.png"
import producto from "../assets/producto.png"
import PERSONALIZADO from "../assets/PERSONALIZADO.png"

const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [search, setSearch] = useState("")

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)

    const traducir = data.map(products => {
      if (products.category=== "jewelery") {
        return { ...products, category: "joyería" }
      } else if (products.category === "men's clothing") {
        return {...products, category: "ropa de hombre" }
      } else if (products.category === "women's clothing") {
        return { ...products, category: "ropa de mujer" }
      } else if (products.category === "electronics") {
        return { ...products, category: "electronica" }
      }
      return products
    })
    
    setProducts(traducir)
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const searchBar = search.toLocaleLowerCase()
  const filterProducts = products.filter((products) => 
    products.title.toLocaleLowerCase().includes(searchBar) || 
    products.description.toLocaleLowerCase().includes(searchBar) ||
    products.category.toLocaleLowerCase().includes(searchBar))

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch( `https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <section className="img-fluid" >
        <img src={imagendebanner} alt="Banner" className="banner-class" />
      </section>

      <section className="seccion-productos">
        <h2 className="home-h2">Nuestros productos</h2>
        <p className="home-p">Elegí entre nuestras categorías más populares.</p>

        <div className="product-search">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        {
          showPopup && <section className="product-edit">
            <h2>Editando producto.</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button className="btm-cerrar" onClick={() => setShowPopup(null)}>Cerrar</button>
              <button className="btm-actualizar">Actualizar</button>
            </form>
          </section>
        }
        <div className="card">
          {
            filterProducts.map((product) => <div key={product.id} className="car-conten" >
              <img className="card-img-top" src={product.image} alt={`Imagen de ${products.title}`} />
              <div className="card-body">
                <h2 className="card-title" key={product.id}>{product.title}</h2>
                <p className="card-price">${product.price}</p>
                <p className="card-text"> {product.description.length > 100 
                  ? product.description.slice(0, 100) + "..." 
                  : product.description}
                </p>
                <p><strong>{product.category}</strong></p>
                {
                  user && <div>
                  <button className="btn btn-primary" onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button className="btn btn-primary" onClick={() => handleDelete(product.id)}>Borrar</button>
                  </div>
                }
              </div>
            </div>)
          }
        </div>
      </section>

      <section className="seccion-porque">
        <h2>¿Por qué elegirnos?</h2>
        <ul className="porque-img">
        <li><img src={enviosatodoelpais} alt="Envios a todo el pais" /></li>
        <li><img src={producto} alt="" /></li>
        <li><img src={PERSONALIZADO} alt="" /></li>
        </ul>
        </section>
    </Layout>
  )
}

export { Home }         



