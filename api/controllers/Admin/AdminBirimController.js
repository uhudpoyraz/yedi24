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

    Blok.find(function(err, bloklar) {
      if (err) {return res.serverError(err);}


        return res.view('admin/birim/add',{layout:'admin/layout',bloklar: bloklar});




    });


  },


  /**
   * `Admin/AdminBlokController.save()`
   */
  save: function (req, res) {


    var blokId=req.param('blokid');
    var name=req.param('name');
    var code=req.param('code');

    Birim.create({isim:name,kod:code,blokId:blokId}).exec(function createCB(err, created){
      console.log('Created blok with name ' + created.isim);
      if(err) {
        return res.json({
          todo: 'hata olustu'
        });
      }
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin/birim/add')
    });

  },


  /**
   * `Admin/AdminBlokController.list()`
   */
  list: function (req, res) {

    Birim.find()
      .populate('blokId')
      .exec(function(err, birimler) {

        if (err) {return res.serverError(err);}

        return res.view('admin/birim/list',{layout:'admin/layout',birimler: birimler});
           });

  },


  /**
   * `Admin/AdminBlokController.edit()`
   */
  edit: function (req, res) {


    var id=req.param('id');

    Birim.findOne({
      id:id
    }).exec(function (err, birim){
      if (err) {
        return res.negotiate(err);
      }
      if (!birim) {
        return res.notFound('Could not find Finn, sorry.');
      }

      Blok.find(function(err, bloklar) {
        if (err) {return res.serverError(err);}

          return res.view('admin/birim/edit',{layout:'admin/layout',birim:birim,bloklar: bloklar});



      });

    });
  },


  /**
   * `Admin/AdminBlokController.update()`
   */
  update: function (req, res) {



    Birim.findOne(req.body.id).exec(function(error, birim) {
      if(error) {
        // do something with the error.
      }

  

      if(req.body.blokid) {

        birim.blokId = req.body.blokid;
      }

      if(req.body.name) {

        birim.isim = req.body.name;
      }
      if(req.body.code) {

        birim.kod = req.body.code;
      }
      birim.save(function(error) {
        if(error) {
          // do something with the error.
        } else {
          // value saved!
          return res.redirect('/admin/birim/edit/'+req.body.id);
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

    Birim.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/birim/');
      });
  }


};

