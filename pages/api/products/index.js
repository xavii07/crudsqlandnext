import { connectionSQL } from '../../../config/conection'

export default async function handler (req, res) {
  switch (req.method) {
    case "POST":
      return await saveProduct(req, res)

    case "GET":
      return await getProducts(req, res)
  }
}

const saveProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body
    const [respuesta] = await connectionSQL.query("INSERT INTO product SET ?", {
      name,
      price,
      description
    })
    return res.status(200).json({ name, price, description, id: respuesta.insertId });
  } catch (error) {
    if (error.message.includes("Incorrect decimal value")) {
      error.message = "El campo precio acepta solamente numeros"
    }
    return res.status(500).json({ message: error.message })
  }
}

const getProducts = async (req, res) => {
  try {
    const [respuesta] = await connectionSQL.query("SELECT * FROM product")
    return res.status(200).json(respuesta)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
