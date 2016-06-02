/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {


  login: function (req, res) {

    if(req.flash('loginMessage')=="hata"){

      req.flash('loginMessage','<script type="text/javascript"> alert("Hatalı Email yada Şifre"); </script>');

    }else {
      req.flash('loginMessage','');
    }

    return res.view('admin/login/login', {layout: 'admin/login/loginLayout'});

  },

  doLogin: function (req, res) {

    var email = req.param("email");
    var password = req.param("password");

    var crypto = require('crypto');
    var hash = crypto.createHash('sha1').update(password).digest('hex');

    var query='select *,kullanicilar.id as kullaniciid from kullanicilar inner join yetkitipi on yetkitipi.id=kullanicilar."gorevId" ' +
      'where yetkitipi."yetkiDerecesi"::numeric =0.1 and email=\''+email+'\' and sifre=\''+hash+'\'';

    Kullanicilar.query(query, function(err, result) {
      if (err) {
        return console.log(err);
      }

      console.log(query);
      if (result.rowCount!=1) {
        console.log(result.rowCount);
        req.flash('loginMessage','hata');
        return res.redirect('/admin/login');

      } else {

        req.session.AdminkullaniciDetay = result.rows[0];

        return res.redirect('/admin/');

      }
    });
  },
  logout: function (req, res) {

    req.session.AdminkullaniciDetay = null;
    return res.redirect('/');


  }
};

