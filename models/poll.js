var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,pollSchema = Object.create(
                        Schema({
                                creator: { type: String, ref:'user' },
                                name : String,
                                desc : String,
                                options :[{ type: Schema.Types.ObjectId, ref: "Option"}],
                                voters : [{ type: Schema.Types.ObjectId, ref:'user'}]
                             })
                    );
                    
var Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll
