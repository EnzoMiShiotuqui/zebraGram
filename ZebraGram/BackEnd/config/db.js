const mongoose = require('mongoose')

// Connection
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5jemv7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        
        console.log("Conectado ao banco")

        return dbConn
    } catch (error) {
        console.log(error)
    }
}

conn()


module.exports = conn