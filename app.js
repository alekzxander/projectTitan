let express = require('express');
let ejs = require('ejs');
let app = express();



app.get('/', (req, res) => {
    res.render('Header.ejs')
})

app.get('/', (req, res) => {
    res.render('Menu.ejs')
})

app.get('/', (req, res) =>{
    res.render('carte.ejs')
})

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));


app.use(express.static(__dirname + '/public'));

app.listen(9740)