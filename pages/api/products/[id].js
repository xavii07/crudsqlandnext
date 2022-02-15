import { connectionSQL } from '../../../config/conection'

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      return await getInfoProduct(req, res)

    case "DELETE":
      return await deleteProduct(req, res)

    case "PUT":
      return await updateProduct(req, res)

    default:
      break
  }
}

const getInfoProduct = async (req, res) => {
  const { id } = req.query
  const [result] = await connectionSQL.query("SELECT * FROM product WHERE id = ?", [id])
  return res.status(200).json(result[0]);
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query
    await connectionSQL.query("DELETE FROM product WHERE id = ?", [id])
    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.query
    const respuesta = await connectionSQL.query("UPDATE product SET ? WHERE id = ?", [req.body, id])
    console.log(respuesta)
    return res.status(204).json()
  } catch (error) {
    if (error.message.includes("Incorrect decimal value")) {
      error.message = "El campo precio acepta solamente numeros"
    }
    if (error.message.includes("Out of range")) {
      error.message = "El campo precio esta fuera de rango"
    }
    return res.status(500).json({ message: error.message })
  }
}
