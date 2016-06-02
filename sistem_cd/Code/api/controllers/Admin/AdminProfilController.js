/**
 * ProfilController
 *
 * @description :: Server-side logic for managing kullanicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  /**
   * `Admin/AdminProfilController.add()`
   */

  /**
   * `Admin/AdminProfilController.edit()`
   */
  edit: function (req, res) {
    req.flash('profil', 'active');


    var id=req.session.AdminkullaniciDetay.id;

 
    Kullanicilar.findOne({
      id:id
    }).exec(function (err, profil){
      if (err) {
        return res.negotiate(err);
      }
      if (!profil) {
        return res.notFound('Could not find Finn, sorry.');
      }

      return res.view('admin/profil/edit',{layout:'admin/layout',profil:profil});
    });
  },
  /**
   * `Admin/AdminProfilController.update()`
   */
  update: function (req, res) {

    var id=req.session.AdminkullaniciDetay.id;
    
 
    Kullanicilar.findOne(id).exec(function(error, guncelle) {
		if(error) {
		// do something with the error.
		}
		if(req.body.name) {
      guncelle.isim = req.body.name;
		}
		if(req.body.surname) {
      guncelle.soyIsim = req.body.surname;
		}
		if(req.body.email) {
      guncelle.email = req.body.email;
		}
		if(req.body.password.length>0) {
      var crypto = require('crypto');
      guncelle.sifre = crypto.createHash('sha1').update(req.body.password).digest('hex');

		}

      guncelle.save(function(error) {
          if(error) {
            req.flash('message','Sorun Oluştu.');
            req.flash('type','danger');
            req.flash('icon', 'ban');
          } else {
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
          return res.redirect('/admin/profil');
        }
      });
    });
  },
  /**
   * `Admin/AdminProfilController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },
  delete: function (req, res) {
    var id=req.param('id');
    Kullanicilar.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/kullanici/');
      });
  }
};



