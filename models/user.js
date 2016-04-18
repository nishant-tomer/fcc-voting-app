var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,userSchema = Object.create(
                        Schema({
                        		uid: String,
                        		displayName: String,
                        		firstName: String,
                                lastName: String,
                                email: String,
                                image: String,
                                polls:  [{ type:String, ref:'Poll' }]

                            })
                    );

User = mongoose.model('user', userSchema)

module.exports = User
