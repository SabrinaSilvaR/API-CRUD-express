const express = require('express');
const morgan = require('morgan');
const path = require('path')

const app = express()

const HomeRoutes = require('./routes/home');
const UserRoute = require('./routes/user')


app.set('port', 3000);
app.set(`case sensitive routing`, true) // para respetar mayusculas en url

app.use(morgan('dev'));
app.use(express.json());

app.use(HomeRoutes)
app.use(UserRoute)


let products = [{
    id: 1,
    name: 'sabrina',
    price: '100'
}]




app.get('/products', (req, res) => {
    res.json(products)
});
app.post('/products', (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body, }// ... copia los elementos y agrega el id 
    // const { name, price } = req.body;
    // console.log(name, price)
    // const newProduct = { id: products.length, name, price } 
    products.push(newProduct)
    res.send(newProduct)

});
app.put('/products', (req, res) => {
    res.send('actualizando productos')
});
app.delete('/products', (req, res) => {
    res.send('eliminando productos')
});

app.get('/products/:id', (req, res) => {
    const productsFount = products.find(function (products) {
        return products.id == req.params.id
        // return products.id === parseInt(req.params.id) transformar a numero 
    })
    if (!productsFount) return res.status(404).json({
        message: 'products not found'
    })
    res.json(productsFount)
})

app.delete('/products/:id', (req, res) => {
    const productsFount = products.find((products) => products.id === parseInt(req.params.id))
    if (!productsFount) return res.status(404).json({
        message: 'products not found'
    });
    products = products.filter(p => p.id !== parseInt(req.params.id))
    res.sendStatus(204)

})


app.put('/products/:id', (req, res) => {
    const newData = req.body
    const productsFount = products.find((products) => products.id === parseInt(req.params.id))
    if (!productsFount) return res.status(404).json({
        message: 'products not found'
    });

    const newProduct = products.map((p) => p.id === parseInt(req.params.id) ? { ...p, ...newData } : p)
    res.json({ message: 'products update', updatedProduct: newData });
})



app.use('/public', express.static('./public'))
app.use("/public", express.static(path.join(__dirname, "public")))


app.listen(3000)
console.log(`server port ${app.get('port')}`)