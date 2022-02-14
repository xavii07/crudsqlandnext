import { connectionSQL } from "../../config/conection";

export default async function handler (req, res) {
  try {
    const [rows] = await connectionSQL.query("SELECT NOW()");
    return res.status(200).json({ fecha: rows[0]["NOW()"] });
  } catch (error) {
    console.log(error)
    res.status(404).json("404 asdsa")
  }
}
