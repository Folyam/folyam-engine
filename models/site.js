module.exports = function(mongoose) {
  var modelObject = {};
  
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  
  var SiteSchema = new Schema({
    domain      : String,
    name        : String,
    theme       : String
  });
  
  SiteSchema.static('currentSite', function(req, cb) {
    var hostname = req.headers.host.replace(/:.*/, "");
    return this.findOne({ domain: hostname }, cb);
  });
  
  modelObject.SiteSchema  = SiteSchema;
  modelObject.Site        = mongoose.model('Site', SiteSchema);
  
  return modelObject;
}