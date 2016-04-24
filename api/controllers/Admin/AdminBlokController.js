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
        return res.json({
          todo: 'hata olustu'
        });
      }
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin/blok/add')
    });

  },


  /**
   * `Admin/AdminBlokController.list()`
   */
  list: function (req, res) {

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


          return res.view('admin/blok/add',{layout:'admin/layout',binalar: binalar,kullanicilar: kullanicilar});

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
          // do something with the error.
        } else {
          // value saved!
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

    Blok.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/blok/');
      });
  }


};

