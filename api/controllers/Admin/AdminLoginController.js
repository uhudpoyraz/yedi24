/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {



  login: function (req, res) {


    return res.view('admin/login/login',{layout:'admin/login/loginLayout'});

  },

  doLogin: function (req, res) {

    var email = req.param("email");
    var password = req.param("password");

     var kullanici = Kullanicilar.findOne({
      email: email
    }).exec(function afterwards(err, kullanici) {
      // Error handling
      if (err) {

      } else {
        var crypto = require('crypto');
        var hash = crypto.createHash('sha1').update(password).digest('hex');



        if (kullanici.sifre == hash) {
            if(kullanici.hesapDurum==1){

              req.session.AdminkullaniciDetay =kullanici;
              return res.redirect('/admin/');
            }else{

              return res.json({"success": false,message:"Hesabınız onaylanmamıstır.Lütfen Hesabınızı onaylayınız."});


            }


        } else {
          return res.redirect('/admin/login');

        }


      }
    });


  },
  logout: function (req, res) {

    req.session.AdminkullaniciDetay =null;
     return  res.redirect('/');


  }
};

