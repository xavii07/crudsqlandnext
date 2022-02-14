import axios from 'axios'
import Card from '../../components/Card'
import { useRouter } from 'next/router'

const InfoProduct = ({ product }) => {
  const { id, created_at: createdAt } = product
  const router = useRouter()

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`)
    router.push("/products")
  }

  const handleEdit = async (id) => {
    router.push(`/products/edit/${id}`)
  }

  return (
      <>
        <h2 className='my-5 text-center text-2xl text-green-500'>Details of Product N° {id}</h2>
        <Card {...product} createdAt={createdAt}/>
        <div className='w-full flex justify-start gap-4 m-5'>
            <button
                onClick={() => handleDelete(id)}
                className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded'
            >Delete</button>
            <button
              className='bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded'
              onClick={() => handleEdit(id)}
            >Edit</button>
        </div>
      </>
  )
}

export default InfoProduct

export async function getServerSideProps (context) {
  const { id } = context.query

  const { data: product } = await axios.get(`http://localhost:3000/api/products/${id}`)

  return {
    props: {
      product
    }
  }
}
