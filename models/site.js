module.exports = function(mongoose) {
  var modelObject = {};
  
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  
  var SiteSchema = new Schema({
    domain      : String,
    name        : String,
    theme       : String,
    owner       : { type: ObjectId, ref: "Author" },
    gplus_id    : { type: String, default: "" }
  });
  
  SiteSchema.static('currentSite', function(req, cb) {
    var hostname = req.headers.host.replace(/:.*/, "");
    return this.findOne({ domain: hostname }, cb);
  });
  
  SiteSchema.static('currentUrl', function(req) {
    var url =  req.protocol
    url += '://'
    url += req.headers.host.replace(/:.*/, "");
    url += req.url;
    
    return url;
  });
  
  SiteSchema.static('render404', function(req, res) {
    res.status(404);
    return res.render('error/404', {url: SiteModel.currentUrl(req), title: "404"});
  });
  
  modelObject.SiteSchema  = SiteSchema;
  modelObject.Site        = mongoose.model('Site', SiteSchema);
  
  return modelObject;
}