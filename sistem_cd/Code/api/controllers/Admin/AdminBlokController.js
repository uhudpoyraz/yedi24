/**
 * Admin/AdminBlokController
 *
 * @description :: Server-side logic for managing admin/adminbloks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `Admin/AdminBlokController.add()`
   */
  add: function (req, res) {
    req.flash('blok', 'active');

    Bina.find(function(err, binalar) {
      if (err) {return res.serverError(err);}

      Kullanicilar.find(function(err, kullanicilar) {
        if (err) {return res.serverError(err);}


        return res.view('admin/blok/add',{layout:'admin/layout',binalar: binalar,kullanicilar: kullanicilar});

      });


    });


  },


  /**
   * `Admin/AdminBlokController.save()`
   */
  save: function (req, res) {

    var kullaniciId=req.param('kullaniciid');
    var binaId=req.param('binaid');
    var name=req.param('name');
    var code=req.param('code');

    Blok.create({isim:name,kod:code,binaId:binaId,kullaniciId:kullaniciId}).exec(function createCB(err, created){
      console.log('Created blok with name ' + created.isim);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');
      }
      return res.redirect('/admin/blok/add')
    });

  },


  /**
   * `Admin/AdminBlokController.list()`
   */
  list: function (req, res) {
    req.flash('blok', 'active');

    Blok.find()
      .populate('binaId')
      .exec(function(err, bloklar) {

        if (err) {return res.serverError(err);}

        return res.view('admin/blok/list',{layout:'admin/layout',bloklar: bloklar});
           });

  },


  /**
   * `Admin/AdminBlokController.edit()`
   */
  edit: function (req, res) {
    req.flash('blok', 'active');


    var id=req.param('id');

    Blok.findOne({
      id:id
    }).exec(function (err, blok){
      if (err) {
        return res.negotiate(err);
      }
      if (!blok) {
        return res.notFound('Could not find Finn, sorry.');
      }

      Bina.find(function(err, binalar) {
        if (err) {return res.serverError(err);}


        Kullanicilar.find(function(err, kullanicilar) {
          if (err) {return res.serverError(err);}


          return res.view('admin/blok/edit',{layout:'admin/layout',blok:blok,binalar: binalar,kullanicilar: kullanicilar});

        });


      });

    });
  },


  /**
   * `Admin/AdminBlokController.update()`
   */
  update: function (req, res) {



    Blok.findOne(req.body.id).exec(function(error, blok) {
      if(error) {
        // do something with the error.
      }

      if(req.body.kullaniciid) {

        blok.kullaniciId = req.body.kullaniciid;
      }

      if(req.body.binaid) {

        blok.binaId = req.body.binaid;
      }

      if(req.body.name) {

        blok.isim = req.body.name;
      }
      if(req.body.code) {

        blok.kod = req.body.code;
      }
      blok.save(function(error) {
        if(error) {
          req.flash('message','Sorun Oluştu.');
          req.flash('type','danger');
          req.flash('icon', 'ban');
        } else {
          req.flash('message','Güncelleme Başarılı.');
          req.flash('type','success');
          req.flash('icon', 'check');
          return res.redirect('/admin/blok/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `Admin/AdminBlokController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');
      
      Birim.findOne({
        blokId:id
      }).exec(function (err, birim){
        if (err) {
          return res.negotiate(err);
        }else {
          if (birim !=null) {
              req.flash('message','Kullanılan kaydı silemezsiniz.');
              req.flash('type','danger');
              req.flash('icon', 'ban');
              return res.redirect('/admin/blok/');
          }else{
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
            Blok.destroy({id: id}).exec(function(e,r){
              return res.redirect('/admin/blok/'); 
            });
          }
        }
    });
  }


};

