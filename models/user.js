var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,userSchema = Object.create(
                        Schema({
                                google: {
                                    		id: String,
                                    		displayName: String,
                                    		firstName: String,
                                            lastName: String,
                                            email: String,
                                            image: String
                                },
                                polls:  {

                                    



                                }

                            })
                    );

User = mongoose.model('user', userSchema)

module.exports = User
