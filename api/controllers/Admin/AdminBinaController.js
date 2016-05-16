/**
 * BinaController
 *
 * @description :: Server-side logic for managing binas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `BinaController.add()`
   */
  add: function (req, res) {

    req.flash('bina', 'active');
    res.view('admin/bina/add', {layout: 'admin/layout'});

  },


  /**
   * `BinaController.save()`
   */
  save: function (req, res) {

    var name=req.param('name');
    var code=req.param('code');
    Bina.create({isim:name,kod:code}).exec(function createCB(err, created){
      console.log('Created user with name ' + created.isim);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');
      }
      res.redirect('/admin/bina/add')
    });

  },


  /**
   * `BinaController.list()`
   */
  list: function (req, res) {

    Bina.find(function(err, binalar) {
      if (err) {return res.serverError(err);}
      req.flash('bina', 'active');

      return res.view('admin/bina/list',{layout:'admin/layout',binalar: binalar});

    });




  },


  /**
   * `BinaController.edit()`
   */
  edit: function (req, res) {


    var id=req.param('id');

    Bina.findOne({
      id:id
    }).exec(function (err, bina){
        if (err) {
          return res.negotiate(err);
        }
        if (!bina) {
          return res.notFound('Could not find Finn, sorry.');
        }

      req.flash('bina', 'active');

    res.view('admin/bina/edit',{layout:'admin/layout',bina:bina});
    });
  },


  /**
   * `BinaController.update()`
   */
  update: function (req, res) {



      Bina.findOne(req.body.id).exec(function(error, bina) {
      if(error) {
        // do something with the error.
      }

      if(req.body.name) {

        bina.isim = req.body.name;
      }
        if(req.body.code) {

          bina.kod = req.body.code;
        }

        bina.save(function(error) {
          if(error) {
            req.flash('message','Sorun Oluştu.');
            req.flash('type','danger');
            req.flash('icon', 'ban');
          } else {
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
          return res.redirect('/admin/bina/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `BinaController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    Bina.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/bina/');
      });
  }


};

