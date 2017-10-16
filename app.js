let express = require('express');
let app = express();

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('carte.ejs');
})

app.listen(2501);
