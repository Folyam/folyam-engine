var services = require('../services');
    SiteModel = services.useModel('site').Site;
    
module.exports = function(app) {
  app.get('/', function(req, res) {
    SiteModel.currentSite(req, function(err, currentSite) {
      console.log(currentSite);
      res.render('page/index', { title: 'Android Jelly Bean-t pakoltam Galaxy S-re' });
    })
  });

/*
  app.get('/create_sites', function (req, res) {
    var Site = services.useModel('site'),
    s1 = new Site.Site(),
    s2 = new Site.Site();
    s3 = new Site.Site();
    s1.domain = 'tech.folyam.info';
    s1.name   = 'Tech Folyam.info';
    s1.theme  = 'default';
    
    s2.domain = 'help.folyam.info';
    s2.name   = 'Segíts Folyam.info';
    s2.theme  = 'default';
    
    s3.domain = 'localhost';
    s3.name   = 'Dev Folyam.info';
    s3.theme  = 'default';
    
    s1.save(function(err) {
      if (err) {
        console.log(err);
      }
      
      s2.save(function(err) {
        if (err) {
          console.log(err);
        }
        
        s3.save(function(err) {
          if (err) {
            console.log(err);
          }

          res.redirect('/');
        });
      });
    });
  });
*/
/*  
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