const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '@twk13877*',
    port: 5432,
})
const getStyles = (request, response) => {
    pool.query('SELECT * FROM public.styles', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getStyleById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public.styles WHERE style_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createStyle = (request, response) => {
    const { style_desc, style_type, style_price } = request.body
    
    console.log(style_desc, style_type, style_price)
    
    pool.query('INSERT INTO public.styles ( style_desc, style_type, style_price ) VALUES ($1, $2, $3)', [style_desc, style_type, style_price], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Style added with ID: ${results.insertId}`)
    })
  }
  
  const updateStyle = (request, response) => {
    const id = parseInt(request.params.id)
    const { style_desc, style_type, style_price } = request.body
  
    pool.query(
      'UPDATE public.styles SET style_desc = $1, style_type = $2, style_price = $3 WHERE style_id = $4',
      [style_desc, style_type, style_price, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Style modified with ID: ${id}`)
      }
    )
  }
  
  const deleteStyle = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public.styles WHERE style_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Style deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getStyles,
    getStyleById,
    createStyle,
    updateStyle,
    deleteStyle
  }