import Link from 'next/link'

const Card = ({ name, price, description, createdAt, id }) => {
  return (
    <Link href={`/products/${id}`}>
        <a>
            <article className='m-5 p-5 shadow-sm border rounded'>
                <p className='font-bold inline-block'>{name}</p>
                <span className='ml-2 font-light text-sm text-teal-600'>$ {price}</span>
                <p className='font-thin'><small>{createdAt}</small></p>
                <p>{description}</p>
            </article>
        </a>
    </Link>
  )
}

export default Card
