Var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,userSchema = Object.create( Schema( {
                                    username: String,
                                    password: String
                                }))

User = mongoose.model('user', userSchema)

module.exports = User
