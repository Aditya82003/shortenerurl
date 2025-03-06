import express from 'express'
import shortenerUrlRouter from './routes'
import mongoDBConnection from './connection'
import cookieParser from 'cookie-parser';

const app = express()
const PORT = 3001

mongoDBConnection('mongodb://127.0.0.1:27017/shortenerurldb')
.then(()=>console.log("MongoDB is connected successfully"))
.catch((error)=>console.log(`Error during connecting MongoDB ${error}`))

app.use(express.json())
app.use(cookieParser());


app.use('/shortenerurl',shortenerUrlRouter)

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`))