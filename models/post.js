module.exports = function(mongoose) {
  var modelObject = {};
  
  var Schema   = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  
  var TagSchema = new Schema({
    content     : String,
    slug        : { type: String, lowercase: true, trim: true }
  });
  
  TagSchema.pre('save', function(next) {
    // Todo: slug
    next();
  });
  
  var PostSchema = new Schema({
    title       : String,
    slug        : { type: String, lowercase: true, trim: true },
    content     : String,
    author      : { type: ObjectId, ref: "Author" },
    site        : { type: ObjectId, ref: "Site" },
    created_at  : { type: Date, default: Date.now },
    is_public   : { type: Boolean, default: false },
    gplus_url   : { type: String, default: "" },
    tags        : [{type: ObjectId, ref: "Tag"}],
    main_image  : { type: String, default: "" }
  });
  
  PostSchema.virtual('lead_text').get(function() {
    if (this.content.match(/<br class=["']break["']\/>/)) {
      return this.content.split(/<br class=["']break["']\/>/);
    } else {
      // Todo: get limited characters of the content
      return this.content;
    }
  });
  
  PostSchema.static('lastPostsBySite', function(site_id, limit, cb) {
    if (typeof site_id == "undefined") {
      // Todo: Implement global list
      return cb("Site not found", null);
    }
    if (typeof limit == "undefined" || limit === null) { limit = 7; }
    return this.find({site: site_id}).sort({created_at: -1}).limit(limit).exec(cb);
  });
  
  PostSchema.pre('save', function(next) {
    // Todo: slug
    next();
  });
  
  modelObject.TagSchema   = TagSchema;
  modelObject.Tag         = mongoose.model('Tag', PostSchema);
  modelObject.PostSchema  = PostSchema;
  modelObject.Post        = mongoose.model('Post', PostSchema);
  
  return modelObject;
}