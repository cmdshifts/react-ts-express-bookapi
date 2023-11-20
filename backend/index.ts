import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { Query } from './lib/types'
const port = process.env.PORT || 8080
const user = process.env.MONGO_USER || 'root'
const pwd = process.env.MONGO_PWD || 'blhyXaE4Q9KI87Gz'
const domain = process.env.MONGO_DOMAIN || 'utcc-sp444.glu0qll.mongodb.net'

const app = express()

var mongoUri = `mongodb+srv://${user}:${pwd}@${domain}/?retryWrites=true&w=majority`

app.use(cors())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { title: 'Book API @1.0' })
})

app.get('/getBooks', async (req, res) => {
  var categories = req.query.categories as string
  var pageCount = parseInt(req.query.pageCount as string)

  var categoryArray: Array<String> = []
  let query: Query = {}

  if (categories) {
    categoryArray = categories.split(',')
  }

  if (categoryArray.length > 0) {
    query.categories = { $in: categoryArray }
  }

  if (pageCount) {
    query.pageCount = { $gte: pageCount }
  }

  const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 })
  await client.connect()

  console.log(query)
  const result = await client
    .db('SP444')
    .collection('Books')
    .find(query)
    .toArray()
  await client.close()
  res.status(200).json(result)
})

app.get('/getCategoryList', async (req, res) => {
  const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 })
  await client.connect()
  const result = await client.db('SP444').collection('Books').find().toArray()
  await client.close()
  const categoryList: Array<String> = []
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].categories.length; j++) {
      if (!categoryList.includes(result[i].categories[j])) {
        categoryList.push(result[i].categories[j])
      }
    }
  }
  res.status(200).json(categoryList)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
