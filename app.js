let express = require('express');
let ejs = require('ejs');
let app = express();


app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})



app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));


app.use(express.static(__dirname + '/public'));

app.listen(8080)