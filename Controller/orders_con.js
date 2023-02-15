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
  const getOrderByDate = (request, response) => {
    const { o_date } = request.body
  
    pool.query('SELECT * FROM public."Orders" WHERE o_date = $1', [o_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getOrderByDateNow = (request, response) => {
    const dateNow = new Date();
    pool.query('SELECT * FROM public."Orders" WHERE o_date = $1', [dateNow] ,(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getOrderByDateRenge = (request, response) => {
    const { first_date, end_date } = request.body
  
    pool.query('SELECT * FROM public."Orders" WHERE o_date between $1 and $2 ', [first_date, end_date] ,(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createOrder = (request, response) => {
    const { user_id, car_id, style_id, order_total, o_date, o_status } = request.body
    
    console.log(user_id, car_id, style_id, order_total, o_date, o_status)
    
    pool.query('INSERT INTO public."Orders" ( user_id, car_id, style_id, order_total, o_date, o_status ) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, car_id, style_id, order_total, o_date, o_status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Order added with ID: ${results.insertId}`)
    })
  }
  
  const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { user_id, car_id, style_id, order_total, o_date, o_status } = request.body
  
    pool.query(
      'UPDATE public."Orders" SET user_id = $1, car_id = $2, style_id = $3, order_total = $4, o_date = $5, o_status = $6  WHERE o_id = $7',
      [user_id, car_id, style_id, order_total, o_date, o_status, id],
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
    deleteOrder,
    getOrderByDate,
    getOrderByDateNow,
    getOrderByDateRenge
  }