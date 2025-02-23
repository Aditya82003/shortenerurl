import express from 'express'
import shortenerUrlRouter from './routes'

const app = express()
const PORT = 3001

app.use(express.json())


app.use('/shortenerurl',shortenerUrlRouter)

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`))