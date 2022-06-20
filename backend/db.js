const mongoose = require('mongoose');

const mogoUri = 'mongodb://localhost:27017/INotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const conectToMongodb = () => {
    mongoose.connect(mogoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('database connect')
        })
        .catch((error) => { console.log('somthing wrong', error) })

}

module.exports = conectToMongodb