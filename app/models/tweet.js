var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetsSchema = new Schema({
    message: {type:String,required:true},
    author: {type:String,required:true}
});


//Export model
module.exports = mongoose.model('Tweets', tweetsSchema);
