const express = require('express')
const app = express()
const Cars = require("./Controller/cars_con")
const Users = require("./Controller/user_con")
const Orders = require("./Controller/orders_con")
const Styles = require("./Controller/styles_con")

app.use(express.json())
app.get('/', (req, res) => {
  console.log(db)
  res.send("Hello world")
})

app.get('/getCars', Cars.getCars)
app.get('/getCars/:id', Cars.getCarById)
app.post('/addCar', Cars.createCar)
app.post('/updateCar/:id', Cars.updateCar)
app.delete('/deleteCar/:id', Cars.deleteCar)

app.get('/getUsers', Users.getUsers)
app.get('/getUsers/:id', Users.getUserById)
app.post('/addUser', Users.createUser)
app.post('/updateUser/:id', Users.updateUser)
app.delete('/deleteUser/:id', Users.deleteUser)

app.get('/getOrders', Orders.getOrders)
app.get('/getOrders/:id', Orders.getOrderById)
app.post('/addOrder', Orders.createOrder)
app.post('/updateOrder/:id', Orders.updateOrder)
app.delete('/deleteOrder/:id', Orders.deleteOrder)

app.get('/getStyles', Styles.getStyles)
app.get('/getStyles/:id', Styles.getStyleById)
app.post('/addStyle', Styles.createStyle)
app.post('/updateStyle/:id', Styles.updateStyle)
app.delete('/deleteStyle/:id', Styles.deleteStyle)

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})