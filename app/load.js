const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://eventing-couchbase')
cluster.authenticate('Administrator', 'password')

const bucket = cluster.openBucket('data')

const users = 100

for (let i = 1; i <= users; i++) {
  bucket.upsert(`user::${i}::trigger`, null, { expiry: i * 2 }, (err) => {
    if (err) {
      throw err
    }
    if (i === users) {
      process.exit(0)
    }
  })
}
