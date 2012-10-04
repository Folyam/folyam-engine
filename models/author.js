module.exports = function(mongoose) {
  var modelObject = {};
  
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  
  var AuthorSchema = new Schema({
    username      : String,
    displayName   : String,
    location      : String,
    email         : String,
    googlePlusId  : String,
    approved      : Boolean,
    sites         : [{type: ObjectId, ref: "Site"}]
  });
  
  modelObject.AuthorSchema  = AuthorSchema;
  modelObject.Author        = mongoose.model('Author', AuthorSchema);
  
  return modelObject;
}