import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { SearchBar } from "../components/SearchBar"
import imagendebanner from "../assets/imagendebanner.png"

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
      <section>
        <img src={imagendebanner} alt="Banner" />
      </section>

      <section>
        <h2>Nuestros productos</h2>
        <p>Elegí entre nuestras categorías más populares.</p>

        <SearchBar search={search} setSearch={setSearch} />

        {
          showPopup && <section className="popup-edit">
            <h2>Editando producto.</h2>
            <button onClick={() => setShowPopup(null)}>Cerrar</button>
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
              <button>Actualizar</button>
            </form>
          </section>
        }

        <div className="product-grid">
          {
            filterProducts.map((product) => <div key={product.id}>
              <h2 key={product.id}>{product.title}</h2>
              <img width="80px" src={product.image} alt={`Imagen de ${products.title}`} />
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p><strong>{product.category}</strong></p>
              {
                user && <div>
                  <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              }
            </div>)
          }
        </div>
      </section>

      <section>
        <h2>¿Por qué elegirnos?</h2>
<ul>
  <li>✔ Envíos a todo el país</li>
  <li>✔ Compras 100% seguras</li>
  <li>✔ Productos originales y de calidad</li>
  <li>✔ Soporte personalizado</li>
</ul>
      </section>
      <section>
        <h1>Sobre Nova Market</h1>
<p>Somos una tienda virtual creada por emprendedores que buscan ofrecer productos de calidad con un enfoque moderno y práctico. Nuestra misión es brindar una experiencia de compra segura, simple y satisfactoria, combinando tecnología, moda y estilo en un solo lugar.</p>
      </section>


    </Layout>
  )
}

export { Home }      



