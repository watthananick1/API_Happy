const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '@twk13877*',
    port: 5432,
})
const getCars = (request, response) => {
    pool.query('SELECT * FROM public."Cars"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getCarById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    pool.query('SELECT * FROM public."Cars" WHERE car_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createCar = (request, response) => {
    const { car_brand, car_size, car_price, car_style } = request.body
    
    console.log(car_brand, car_size, car_price, car_style)
    
    pool.query('INSERT INTO public."Cars" (car_brand, car_size, car_price, car_style ) VALUES ($1, $2, $3, $4)', [car_brand, car_size, car_price, car_style], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
  const searchCar = (request, response) => {
    const { search } = request.body
    
    let search1 = '%'+search+'%'
    console.log(search1)
    pool.query('SELECT * FROM public."Cars" WHERE "car_brand" LIKE $1  OR "car_size" LIKE $1 OR "car_style" LIKE $1', [ search1 ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const updateCar = (request, response) => {
    const id = parseInt(request.params.id)
    const { car_brand, car_size, car_price } = request.body
  
    pool.query(
      'UPDATE public."Cars" SET car_brand = $1, car_size = $2, car_price = $3 WHERE car_id = $4',
      [car_brand, car_size, car_price, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteCar = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public."Cars" WHERE car_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const getCarsByLimit = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Cars" Limit $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getCarsByPage = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."Cars" Limit 10 OFFSET ($1*10)-10', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  module.exports = {
    getCars,
    getCarById,
    getCarsByLimit,
    getCarsByPage,
    createCar,
    updateCar,
    deleteCar,
    searchCar
  }