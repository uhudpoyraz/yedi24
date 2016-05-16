/**
 * Admin/IletisimTipiController
 *
 * @description :: Server-side logic for managing admin/iletisimtipis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `IletisimTipiController.add()`
   */
  add: function (req, res) {
    req.flash('iletisimtipi', 'active');


    res.view('admin/iletisimtipi/add', {layout: 'admin/layout'});

  },


  /**
   * `IletisimTipiController.save()`
   */
  save: function (req, res) {

    var value=req.param('value');

    IletisimTipi.create({deger:value}).exec(function createCB(err, created){
      console.log('Created iletisimtipi with deger ' + created.deger);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');
      }
      return res.redirect('/admin/iletisimtipi/add')
    });

  },


  /**
   * `IletisimTipiController.list()`
   */
  list: function (req, res) {
    req.flash('iletisimtipi', 'active');


    IletisimTipi.find(function(err, iletisimtipleri) {
      if (err) {return res.serverError(err);}

      return res.view('admin/iletisimtipi/list',{layout:'admin/layout',iletisimtipleri: iletisimtipleri});

    });




  },


  /**
   * `IletisimTipiController.edit()`
   */
  edit: function (req, res) {
    req.flash('iletisimtipi', 'active');


    var id=req.param('id');

    IletisimTipi.findOne({
      id:id
    }).exec(function (err, iletisimtipi){
      if (err) {
        return res.negotiate(err);
      }
      if (!iletisimtipi) {
        return res.notFound('Could not find Finn, sorry.');
      }


      res.view('admin/iletisimtipi/edit',{layout:'admin/layout',iletisimtipi:iletisimtipi});
    });
  },


  /**
   * `IletisimTipiController.update()`
   */
  update: function (req, res) {



    IletisimTipi.findOne(req.body.id).exec(function(error, iletisimtipi) {
      if(error) {
        return res.json({
          todo: 'hata olustu'
        });

      }

      if(req.body.deger) {

        iletisimtipi.deger= req.body.deger;
      }


      iletisimtipi.save(function(error) {
        if(error) {
          req.flash('message','Sorun Oluştu.');
          req.flash('type','danger');
          req.flash('icon', 'ban');
        } else {
          req.flash('message','Güncelleme Başarılı.');
          req.flash('type','success');
          req.flash('icon', 'check');
          return res.redirect('/admin/iletisimtipi/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `IletisimTipiController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    IletisimTipi.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/iletisimtipi/');
      });
  }


};

