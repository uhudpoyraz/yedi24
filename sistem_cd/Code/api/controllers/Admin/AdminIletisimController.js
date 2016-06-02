/**
 * Admin/IletisimController
 *
 * @description :: Server-side logic for managing admin/iletisimtipis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `IletisimController.add()`
   */
  add: function (req, res) {
    req.flash('iletisim', 'active');


    var users;
    var comm;
    Kullanicilar.find(function(err, kullanicilar) {
      if (err) {return res.serverError(err);}
      users = kullanicilar;
    });

    IletisimTipi.find(function(err, iletisimtipleri) {
        if (err) {return res.serverError(err);}
        comm = iletisimtipleri;
        return res.view('admin/iletisim/add',{layout:'admin/layout',kullanicilar: users, iletisimtipleri: comm});
    });
  },


  /**
   * `IletisimController.save()`
   */
  save: function (req, res) {

    var param = req.params.all();

    Iletisim.create({kullaniciId: param.kullaniciId, iletisimTipId: param.iletisimTipId, deger: param.deger}).exec(function createCB(err, created){
      //console.log('Created iletisim with deger ' + created.kullaniciId + created.iletisimTipId + created.deger);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');
      }
      return res.redirect('/admin/iletisim/add')
    });

  },


  /**
   * `IletisimController.list()`
   */
  list: function (req, res) {
    req.flash('iletisim', 'active');


    Iletisim.find(function(err, iletisim) {
      if (err) {return res.serverError(err);}

      return res.view('admin/iletisim/list',{layout:'admin/layout',iletisim: iletisim});

    });




  },


  /**
   * `IletisimController.edit()`
   */
  edit: function (req, res) {
    req.flash('iletisim', 'active');


    var id=req.param('id');

    Iletisim.findOne({
      id:id
    }).exec(function (err, iletisim){
      if (err) {
        return res.negotiate(err);
      }
      if (!iletisim) {
        return res.notFound('Could not find Finn, sorry.');
      }

    Kullanicilar.find(function(err, kullanicilar) {
        if (err) {return res.serverError(err);}

          IletisimTipi.find(function(err, iletisimtipleri) {
            if (err) {return res.serverError(err);}
            return res.view('admin/iletisim/edit',{layout:'admin/layout',iletisim:iletisim, kullanicilar: kullanicilar, iletisimtipleri: iletisimtipleri});
        });
      });
    });
  },


  /**
   * `IletisimController.update()`
   */
  update: function (req, res) {

    Iletisim.findOne(req.body.id).exec(function(error, iletisim) {
      if(error) {
        return res.json({
          todo: 'hata olustu'
        });
       
      }
      if(req.body.kullaniciId) {

        iletisim.kullaniciId= req.body.kullaniciId;
      }

      if(req.body.iletisimTipId) {

        iletisim.iletisimTipId= req.body.iletisimTipId;
      }

      if(req.body.deger) {

        iletisim.deger= req.body.deger;
      }

      iletisim.save(function(error) {
        if(error) {
          req.flash('message','Sorun Oluştu.');
          req.flash('type','danger');
          req.flash('icon', 'ban');
        } else {
          req.flash('message','Güncelleme Başarılı.');
          req.flash('type','success');
          req.flash('icon', 'check');
          return res.redirect('/admin/iletisim/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `IletisimController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    Iletisim.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/iletisim/');
      });
  }


};

