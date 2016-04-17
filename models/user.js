var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,userSchema = Object.create( Schema( {

                                    google: {
                                    		id: String,
                                    		displayName: String,
                                    		username: String,
                                        email: String
                                    	}

                                }))

User = mongoose.model('user', userSchema)

module.exports = User
