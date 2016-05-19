/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {


  doLogin: function (req, res) {

    var email = req.param("email");
    var password = req.param("password");

    var crypto = require('crypto');
    var hash = crypto.createHash('sha1').update(password).digest('hex');


    var count=0;
    KaraListe.count().where({email: email}).exec(function (err, num) {
      if (err) {
         
      }
       count=num;
    });

      if(count!=0){
        return   res.json({"success": false, message: "Hesabınız Engellenmiştir.",type:0});
      }
  
        Kullanicilar.count().where({email: email, sifre: hash}).exec(function (err, num) {
      if (err) {
        return console.log(err);
      }
      if (num == 0) {

        return res.json({"success": false, message: "Hesabınız engellenmiştir.",type:1});

      } else {
        Kullanicilar.findOne({
          email: email
        }).exec(function afterwards(err, kullanici) {
          // Error handling
          if (err) {

          } else {

            var crypto = require('crypto');
            var hash = crypto.createHash('sha1').update(password).digest('hex');


            if (kullanici.sifre == hash) {
              if (kullanici.hesapDurum == 1) {

                req.session.kullaniciDetay = kullanici;
                return res.json({"success": true, message: "Giriş Başarılı."});
              } else {

                return res.json({"success": false,message: "Hesabınız onaylanmamıstır.Lütfen Hesabınızı onaylayınız."
                });

              }
              
            } else {
              return res.json({"success": false, message: "Şifre veya Email Hatalı."});

            }
          }
        });
      }
    });
  },
  logout: function (req, res) {

    req.session.kullaniciDetay = null;
    return res.redirect('/');


  }
};

