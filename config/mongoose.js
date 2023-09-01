let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UsersRecord')
.then(() => {
    console.log("Database connected successfully");
},(err) => {
  console.log(err);

})

module.exports = mongoose;