/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {


  login: function (req, res) {


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

       
      if (result.rowCount!=1) {


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

