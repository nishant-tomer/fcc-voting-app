var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      ,pollSchema = Object.create(
                        Schema({
                                creator: { type:String, ref:'User' },
                                name : String,
                                desc : String,
                                options :[{ type:String, ref:'Option'}]                             })
                    );

Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll
