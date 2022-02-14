import { connectionSQL } from '../../../config/conection'

export default async function (req, res) {
  switch (req.method) {
    case "POST": {
      const { name, price, description } = req.body
      const [respuesta] = await connectionSQL.query("INSERT INTO product SET ?", {
        name,
        price,
        description
      })
      return res.status(200).json({ name, price, description, id: respuesta.insertId });
    }

    case "GET": {
      const [respuesta] = await connectionSQL.query("SELECT * FROM product")
      return res.status(200).json(respuesta)
    }
  }
}
