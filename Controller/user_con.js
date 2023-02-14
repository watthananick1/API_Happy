const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '@twk13877*',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM public."Users"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Users" WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const {user_fname, user_lname, username, user_address, user_email, user_phone, user_password, user_status} = request.body
    
    console.log(user_fname, user_lname)
    
    pool.query('INSERT INTO public."Users" (user_fname, user_lname, username, user_address, user_email, user_phone, user_password, user_status ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [user_fname, user_lname, username, user_address, user_email, user_phone, user_password, user_status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { user_fname, user_lname, username, user_address, user_email, user_phone, user_password, user_status } = request.body
  
    pool.query(
      'UPDATE public."Users" SET user_fname = $1, user_lname = $2, username = $3, user_address = $4, user_email = $5, user_phone = $6, user_password = $7, user_status = $8  WHERE user_id = $9',
      [user_fname, user_lname, username, user_address, user_email, user_phone, user_password, user_status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public."Users" WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }