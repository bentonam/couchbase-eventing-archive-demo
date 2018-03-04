const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://eventing-couchbase')
cluster.authenticate('Administrator', 'password')

const bucket = cluster.openBucket('trigger')

const users = 1000

for (let i = 1; i <= users; i++) {
  // insert a null document with a random expiry between 5 - 300
  bucket.upsert(
    `user::${i}::trigger`,
    null,
    {
      expiry: Math.floor(Math.random() * 300) + 5
    }, (err) => {
    if (err) {
      throw err
    }
    if (i === users) {
      process.exit(0)
    }
  })
}
