/**
 * KullaniciController
 *
 * @description :: Server-side logic for managing kullanicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  /**
   * `Admin/AdminKullaniciController.add()`
   */
  add: function (req, res) {
    req.flash('kullanici', 'active');

    YetkiTipi.find(function(err, görevtipleri) {
	    if (err) {return res.serverError(err);}
	    return res.view('admin/kullanici/add',{layout:'admin/layout', görevtipleri: görevtipleri});
	  });
  },

  /**
   * `Admin/AdminKullaniciController.save()`
   */
  save: function (req, res) {
  	var name = req.param('name');
  	var surname = req.param('surname');
    var email=req.param('email');
    var password = req.param('password');
    var status = req.param('status');
    var duty = req.param('duty');
    var crypto = require('crypto');
    var passwordHash= crypto.createHash('sha1').update(password).digest('hex');
    console.log(name,surname,email,password, status, duty, passwordHash);    
    Kullanicilar.create({isim: name, soyIsim: surname, email:email, sifre:passwordHash, hesapDurum: status, gorevId:duty}).exec(function createCB(err, created){
      console.log(err);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        console.log('Created email with name ' + created.email);
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');
      }
      return res.redirect('/admin/kullanici/add');
    });
  },
  /**
   * `Admin/AdminKullaniciController.list()`
   */
  list: function (req, res) {
    req.flash('kullanici', 'active');

    Kullanicilar.find(function(err, kullanicilar) {
      if (err) {return res.serverError(err);}

      return res.view('admin/kullanici/list',{layout:'admin/layout',kullanicilar: kullanicilar});

    });
  },
  /**
   * `Admin/AdminKullaniciController.edit()`
   */
  edit: function (req, res) {
    req.flash('kullanici', 'active');

    var id=req.param('id');
    YetkiTipi.find(function(err, görevtipleri) {
      if (err) {return res.serverError(err);}

      Kullanicilar.findOne({
	      id:id
	    }).exec(function (err, kayıt){
	        if (err) {
	          return res.negotiate(err);
	        }
	        if (!kayıt) {
	          return res.notFound('Could not find Finn, sorry.');
	        }

	     return res.view('admin/kullanici/edit',{layout:'admin/layout',kayıt:kayıt, görevtipleri:görevtipleri});
	    });
	});
  },
  /**
   * `Admin/AdminKullaniciController.update()`
   */
  update: function (req, res) {
    Kullanicilar.findOne(req.body.id).exec(function(error, kayıt) {
		if(error) {
		// do something with the error.
		}
		if(req.body.name) {
			kayıt.isim = req.body.name;
		}
		if(req.body.surname) {
			kayıt.soyIsim = req.body.surname;
		}
		if(req.body.email) {
			kayıt.email = req.body.email;
		}
		if(req.body.password.length!=0) {
      
      var crypto = require('crypto');
      var passwordHash= crypto.createHash('sha1').update(req.body.password).digest('hex');
			kayıt.sifre = passwordHash;
		}
		if(req.body.status) {
			kayıt.hesapDurum = req.body.status;
		}
		if(req.body.duty) {
			kayıt.gorevId = req.body.duty;
		}

        kayıt.save(function(error) {
          if(error) {
            req.flash('message','Sorun Oluştu.');
            req.flash('type','danger');
            req.flash('icon', 'ban');
          } else {
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
          return res.redirect('/admin/kullanici/edit/'+req.body.id);
        }
      });
    });
  },
  /**
   * `Admin/AdminSitekaralisteController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },
  delete: function (req, res) {
    var id=req.param('id');
      Sikayetler.findOne({
        kullaniciId:id
      }).exec(function (err, sikayet){
        if (err) {
          return res.negotiate(err);
        }else {
          if (sikayet !=null) {
              req.flash('message','Kullanılan kaydı silemezsiniz.');
              req.flash('type','danger');
              req.flash('icon', 'ban');
              return res.redirect('/admin/kullanici/');
          }else{
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
            Kullanicilar.destroy({id: id}).exec(function(e,r){
              return res.redirect('/admin/kullanici/'); 
            });
          }
        }
    });
  }
};



