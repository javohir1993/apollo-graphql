const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'jasur',
  password: 'parol',
  database: 'posts',
  port: 5432
})

const rows = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows } = await client.query(SQL, params)
    return rows
  }
  catch(err) {
    console.log(err)
  }
  finally {
    client.release()
  }
}

const row = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows: [ row ] } = await client.query(SQL, params)
    return row
  }
  catch(err) {
    console.log(err)
  }
  finally {
    client.release()
  }
}

module.exports.rows = rows
module.exports.row = row