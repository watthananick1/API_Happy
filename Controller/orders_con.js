const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '@twk13877*',
    port: 5432,
})
const getOrders = (request, response) => {
    pool.query('SELECT * FROM public."Orders"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getOrderById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Orders" WHERE o_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createOrder = (request, response) => {
    const { user_id, car_id, style_id, order_total } = request.body
    
    console.log(user_id, car_id, style_id, order_total)
    
    pool.query('INSERT INTO public."Orders" ( user_id, car_id, style_id, order_total ) VALUES ($1, $2, $3, $4)', [user_id, car_id, style_id, order_total], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Order added with ID: ${results.insertId}`)
    })
  }
  
  const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { user_id, car_id, style_id, order_total } = request.body
  
    pool.query(
      'UPDATE public."Orders" SET user_id = $1, car_id = $2, style_id = $3, order_total = $4  WHERE o_id = $5',
      [user_id, car_id, style_id, order_total, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Order modified with ID: ${id}`)
      }
    )
  }
  
  const deleteOrder = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public."Orders" WHERE o_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Order deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
  }