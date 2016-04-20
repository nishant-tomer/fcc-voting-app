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
                                polls:  [{ type: Schema.Types.ObjectId, ref:'Poll' }],
                                voted:  [{ type: Schema.Types.ObjectId, ref:'Poll' }]

                            })
                    );

var User = mongoose.model('user', userSchema)

module.exports = User
