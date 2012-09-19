var services = require('../services');
    SiteModel = services.useModel('site').Site;
    
module.exports = function(app) {
  app.get('/', function(req, res) {
    SiteModel.currentSite(req, function(err, currentSite) {
      if (currentSite === null) {
        var url =  req.protocol
        url += '://'
        url += req.headers.host.replace(/:.*/, "");
        url += req.url;
        res.status(404);
        return res.render('error/404', {url: url, title: "404"});
      }
      console.log(currentSite);
      console.log(currentSite.owner);
      return res.render('page/index', { title: 'Android Jelly Bean-t pakoltam Galaxy S-re' });
    })
  });

/*
  app.get('/create_sites', function (req, res) {
    var Site = services.useModel('site').Site;
    var Author = services.useModel('author').Author;
    Author.findOne({username: "yitsushi"}, function(err, me) {
      s1 = new Site(),
      s2 = new Site();
      s3 = new Site();
      s1.domain = 'tech.folyam.info';
      s1.name   = 'Tech Folyam.info';
      s1.theme  = 'default';
      s1.owner  = me._id;

      s2.domain = 'help.folyam.info';
      s2.name   = 'Segíts Folyam.info';
      s2.theme  = 'default';
      s2.owner  = me._id;

      s3.domain = 'localhost';
      s3.name   = 'Dev Folyam.info';
      s3.theme  = 'default';
      s3.owner  = me._id;

      s1.save(function(err) {
        if (err) {
          console.log(err);
        }
        
        me.sites.addToSet(s1._id);

        s2.save(function(err) {
          if (err) {
            console.log(err);
          }
          
          me.sites.addToSet(s2._id);

          s3.save(function(err) {
            if (err) {
              console.log(err);
            }
            
            me.sites.addToSet(s3._id);
            
            me.save(function(err) {
              if (err) {
                console.log(err);
              }
              
              res.redirect('/');
            });
          });
        });
      });
    });
  });
  
  app.get('/create_me', function (req, res) {
    var model = services.useModel('author');
    var me = new model.Author();
    me.username = 'yitsushi';
    me.displayName = 'Balazs Nadasdi';
    me.location = 'Budapest, HU';
    me.email = 'yitsushi@folyam.info';
    me.googlePlusId = '104695723888883478740';
    
    me.save(function(err) {
      if (err) {
        console.log(err);
      }
      
      res.redirect('/');
    });
  });
*/
};