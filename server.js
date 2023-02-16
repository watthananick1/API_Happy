const express = require('express')
const app = express()
const Cars = require("./Controller/api/cars_con")
const Users = require("./Controller/api/user_con")
const Orders = require("./Controller/api/orders_con")
const Styles = require("./Controller/api/styles_con")

app.use(express.json())
app.get('/', (req, res) => {
  res.send("Hello! welcome to CarsAPI")
})

app.get('/api/getCars', Cars.getCars)
app.get('/api/getCars/:id', Cars.getCarById)
app.get('/api/getCarsByLimit/:id', Cars.getCarsByLimit)
app.get('/api/getCarsByPage/:id', Cars.getCarsByPage)
app.post('/api/addCar', Cars.createCar)
app.post('/api/searchCar', Cars.searchCar)
app.post('/api/updateCar/:id', Cars.updateCar)
app.delete('/api/deleteCar/:id', Cars.deleteCar)

app.get('/api/getUsers', Users.getUsers)
app.get('/api/getUsers/:id', Users.getUserById)
app.post('/api/addUser', Users.createUser)
app.post('/api/updateUser/:id', Users.updateUser)
app.delete('/api/deleteUser/:id', Users.deleteUser)

app.get('/api/getOrders', Orders.getOrders)
app.get('/api/getOrdersWithAddress', Orders.getOrdersWithAddress)
app.get('/api/getOrders/:id', Orders.getOrderById)
app.get('/api/getOrdersByLimit/:id', Orders.getOrdersByLimit)
app.get('/api/getOrdersByPage/:id', Orders.getOrdersByPage)
app.get('/api/getOrderByDateNow', Orders.getOrderByDateNow)
app.post('/api/addOrder', Orders.createOrder)
app.post('/api/getOrderByDate', Orders.getOrderByDate)
app.post('/api/getOrderByDateRenge', Orders.getOrderByDateRenge)
app.post('/api/getOrderByStatus', Orders.getOrderByStatus)
app.post('/api/updateOrder/:id', Orders.updateOrder)
app.delete('/api/deleteOrder/:id', Orders.deleteOrder)

app.get('/api/getStyles', Styles.getStyles)
app.get('/api/getStyles/:id', Styles.getStyleById)
app.post('/api/addStyle', Styles.createStyle)
app.post('/api/updateStyle/:id', Styles.updateStyle)
app.delete('/api/deleteStyle/:id', Styles.deleteStyle)

app.listen(8080, () => {
  console.log('Start server at port 8080.')
})