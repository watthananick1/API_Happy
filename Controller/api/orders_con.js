const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '@twk13877*',
    port: 5432,
})
const getOrders = (request, response) => {
    pool.query('SELECT * FROM public."Orders" ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getOrdersWithAddress = (request, response) => {
    pool.query('SELECT public."Orders".*, public."Users".user_address FROM public."Orders" JOIN public."Users" ON public."Orders".user_id = public."Users".user_id', (error, results) => {
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
    console.log(first_date)
    pool.query('SELECT * FROM public."Orders" WHERE o_date between $1 and $2 ', [first_date, end_date] ,(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getOrderByStatus = (request, response) => {
    const { search } = request.body
    let status = '%'+search+'%'
    console.log(status)
    pool.query('SELECT * FROM public."Orders" WHERE o_status ILIKE $1 ', [status] ,(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createOrder = (request, response) => {
    const { user_id, car_id, order_total, o_date, o_status } = request.body
    
    console.log(user_id, car_id, order_total, o_date, o_status)
    
    pool.query('INSERT INTO public."Orders" ( user_id, car_id, order_total, o_date, o_status ) VALUES ($1, $2, $3, $4, $5)', [user_id, car_id, order_total, o_date, o_status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Order added with ID: ${results.insertId}`)
    })
  }
  
  const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { o_status } = request.body
  
    pool.query(
      'UPDATE public."Orders" SET o_status = $1  WHERE o_id = $2',
      [ o_status, id],
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

  const getOrdersByLimit = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Orders" Limit $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getOrdersByPage = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Orders" Limit 10 OFFSET ($1*10)-10', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  module.exports = {
    getOrders,
    getOrdersWithAddress,
    getOrderById,
    getOrdersByLimit,
    getOrdersByPage,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderByDate,
    getOrderByDateNow,
    getOrderByDateRenge,
    getOrderByStatus
  }