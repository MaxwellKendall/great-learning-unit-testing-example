const SERVER_PORT = 8080;

const DATABASE_URI = `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1`

module.exports = {
    SERVER_PORT,
    DATABASE_URI
}