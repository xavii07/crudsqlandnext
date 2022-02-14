import mysql from 'mysql2/promise'

export const connectionSQL = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "productsdb"
})
