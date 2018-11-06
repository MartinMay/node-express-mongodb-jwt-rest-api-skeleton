require('dotenv-safe').config()
const { Seeder } = require('mongo-seeding')
const path = require('path')

const config = {
  databaseConnectionUri: process.env.MONGO_URI,
  dropDatabase: false
}

const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(
  path.resolve(__dirname, './data'),
  {
    extensions: ['js', 'json', 'ts'],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  }
)

seeder
  .import(collections)
  .then(() => {
    console.log('Seed complete!')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(0)
  })
