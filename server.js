require('dotenv').config()

const app = require('./src/app')
const connectdb = require('./src/config/db')
const port = process.env.PORT

connectdb()
app.listen(port,() => {
    console.log("server is runing in ",port);
    
})