var services = require('../services');
    SiteModel = services.useModel('site').Site,
    PostModel = services.useModel('post').Post;
    
module.exports = function(app) {
  app.get('/', function(req, res) {
    SiteModel.currentSite(req, function(err, currentSite) {
      if (currentSite === null) { return SiteModel.render404(req, res); }
      PostModel.lastPostsBySite(currentSite._id, 7, function(err, posts) {
        return res.render('page/index', { title: 'Android Jelly Bean-t pakoltam Galaxy S-re', posts: posts });
      });
    })
  });

  app.get('/create_posts', function(req, res) {
    SiteModel.currentSite(req, function(err, currentSite) {
      if (currentSite === null) { return SiteModel.render404(req, res); }
      
      var Author = services.useModel('author').Author;
      Author.findOne({username: "yitsushi"}, function(err, me) {
        p = new PostModel();
        p.title       = 'Android Jelly Bean-t pakoltam Galaxy S-re';
        p.content     = 'Elmondható nagyon sok minden a Jelly Bean-ről —a 4.1-es Androidról— jó és rossz oldalon egyaránt. Nekem tetszik és gyorsan meg is mutatnám mi az ami legelőször belopta szívembe eme rendszert.';
        p.author      = me._id;
        p.site        = currentSite._id;
        p.main_image  = 'http://folyam.info/assets/img/2012-08-13-android-jelly-bean-et-pakoltam-a-samsung-galaxy-s-emre-i9000/header.jpeg';
        
        p.save(function(err) {
          if (err) {
            console.log(err);
          }

          res.redirect('/');
        });
      });
    });
  });
/*
  app.get('/create_sites', function(req, res) {
    var Site = services.useModel('site').Site;
    var Author = services.useModel('author').Author;
    Author.findOne({username: "yitsushi"}, function(err, me) {
      var s1 = new Site(),
          s2 = new Site(),
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