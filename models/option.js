var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,optionSchema = Object.create(
                        Schema({
                                belongsTo : { type:String, ref:'Poll' },
                                creator: { type:String, ref: 'User'},
                                name : String
                              })
                    );

Option = mongoose.model('Option', optionSchema)
module.exports = Option
