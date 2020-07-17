const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tenwork',
  host: 'localhost',
  database: 'api',
  password: 'tenwork',
  port: 5432
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const userId = request.params.id
  pool.query('SELECT * FROM USERS WHERE id = $1', [userId], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200)
    response.json(results.rows)
  })
}

const createUser = (request, response) => {
  const user = {}
  user.name = request.body.name
  user.email = request.body.email
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [user.name, user.email], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result)
    console.log(result.rows)
    response.status(201).json({ Result: 'User Created', user: user })
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body
  const user = { id: id, name: name, email: email }

  pool.query('UPDATE users SET NAME = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({ Result: 'User updated', user: user })
  })
}

const deleteUser = (request, response) => {
  const id = request.params.id

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({ Result: 'User deleted', user: { id: id } })
  })
}

// export functions
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
