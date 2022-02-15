import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const initialStateForm = { name: "", price: "", descriprion: "" }

const NewProductForm = () => {
  const [infoproduct, setInfoProduct] = useState(initialStateForm)
  const [error, setError] = useState("")

  const { name, price, description } = infoproduct
  const router = useRouter()

  useEffect(() => {
    const getProduct = async (id) => {
      const { data } = await axios.get(`/api/products/${id}`)
      const { name, description, price } = data
      setInfoProduct({ name, description, price })
    }

    if (router.query.id) {
      getProduct(router.query.id)
    }
  }, [])

  const handleChange = e => {
    setInfoProduct({
      ...infoproduct,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name.trim().length === 0 || price.trim().length === 0 || description.trim().length === 0) {
      setError("Complete todos los campos para continuar")
      setInterval(() => {
        setError("")
      }, 3000)
      return
    }

    try {
      if (router.query.id) {
        await axios.put(`/api/products/${router.query.id}`, { name, price, description })
        toast.info("Product edited succesfull")
      } else {
        await axios.post("/api/products", { name, price, description })
        toast.success("Product saved succesfull")
      }
      setInfoProduct(initialStateForm)
      router.push("/products")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
        <h2
          className='font-medium leading-tight text-1xl m-5 text-teal-900'
        >{router.query.id ? `Edit Product ${router.query.id}` : "Add a new Product"}</h2>
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <label
                htmlFor="name"
                className='block text-gray-700 text-sm font-bold mb-2'
            >Name Product:</label>
            <input
                type="text"
                id="name"
                name="name"
                autoComplete='off'
                onChange={handleChange}
                value={name}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-leading focus:outline-none'
                />
            <label
                htmlFor="price"
                className='block text-gray-700 text-sm font-bold mb-2'
                >Price:</label>
            <input
                type="text"
                id="price"
                autoComplete='off'
                name="price"
                onChange={handleChange}
                value={price}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-leading focus:outline-none'
            />
            <label
                htmlFor="description"
                className='block text-gray-700 text-sm font-bold mb-2'
            >Description:</label>
            <textarea
                name="description"
                id="description"
                cols="30"
                onChange={handleChange}
                value={description}
                className='resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-leading focus:outline-none'
                rows="4"
            ></textarea>
            <input
                className="bg-teal-500 hover:bg-teal-600 hover:cursor-pointer mt-2 text-white py-2 px-4 rounded focus:outline-none"
                type="submit"
                value={router.query.id ? "Edit Product" : "Create Product"}
            />
            {error && (
                <div className="mt-3 flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>{error}</p>
                </div>
            )}
        </form>
    </div>
  )
}

export default NewProductForm
