import axios from 'axios'
import Card from '../../components/Card'

const Products = ({ products }) => {
  return (
      <>
        <h1 className='font-medium leading-tight text-2xl m-5 text-teal-900'>Products</h1>
        {products.map(product => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              createdAt={product.created_at}
              id={product.id}
            />
        ))}
      </>
  )
}

export default Products

export async function getServerSideProps (context) {
  const { data: products } = await axios.get("http://localhost:3000/api/products")
  return {
    props: { products }
  }
}
