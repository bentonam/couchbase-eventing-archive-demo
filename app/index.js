const hapi = require('hapi')
const path = require('path')
const fs = require('fs')

// Create a server with a host and port
const server = new hapi.Server()
server.connection({ port: 8080 })

// Add the route
server.route({
    method: 'POST',
    path:'/archive/{id}',
    handler: (request, reply) => {
      const file = `${request.params.id}.json`
      const contents = JSON.stringify(request.payload)
      console.log(file)
      fs.writeFile(path.join('/usr/backup', file), contents, (err) => {
        if (err) {
          throw err
        }
        reply({ success: true, file: file, size: contents.length })
      })
    }
})

// Start the server
async function start() {
  try {
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', server.info.uri)
}

start()
