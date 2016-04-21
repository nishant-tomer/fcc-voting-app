var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,optionSchema = Object.create(
                        Schema({
                                belongsTo : { type: String, ref:'Poll' },
                                creator: { type:String, ref: 'user'},
                                name : String,
                                count: Number,
                              })
                    );
var Option = mongoose.model('Option', optionSchema)
module.exports = Option
