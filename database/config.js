const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Mongo online')

    } catch (err) {
        console.log(err.message)
        throw new Error('Error when initializing database')
    }

}

module.exports = dbConnection