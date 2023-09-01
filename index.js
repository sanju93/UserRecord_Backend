let express = require('express');
let app = express();

const port = 8000;
require('./config/mongoose');
require('./config/passport_jwt');

app.use(express.json());

app.use('/',require('./routes/index'));



app.listen(port,(err) => {
    if (err){
    console.log(err);
    return;
    }
    console.log("server running on port : ", port)
})