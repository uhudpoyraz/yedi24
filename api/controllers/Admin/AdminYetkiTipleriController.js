/**
 * Admin/AdminYetkiTipleriController
 *
 * @description :: Server-side logic for managing admin/adminyetkilendirmes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `Admin/AdminYetkiTipleriController.add()`
   */
  add: function (req, res) {


    res.view('admin/yetkitipi/add', {layout: 'admin/layout'});

  },


  /**
   * `Admin/AdminYetkiTipleriController.save()`
   */
  save: function (req, res) {

    var gorev=req.param('gorev');
    var yetkiDerecesi=req.param('yetkiderecesi');
    YetkiTipi.create({gorev:gorev,yetkiDerecesi:yetkiDerecesi}).exec(function createCB(err, created){
      console.log('Created yetkilendirme with name ' + created.gorev);
      if(err) {
        return res.json({
          todo: 'hata olustu'
        });
      }
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin/yetkitipi/add')
    });

  },


  /**
   * `Admin/AdminYetkiTipleriController.list()`
   */
  list: function (req, res) {

    YetkiTipi.find(function(err, yetkitipleri) {
      if (err) {return res.serverError(err);}

      return res.view('admin/yetkitipi/list',{layout:'admin/layout',yetkitipleri: yetkitipleri});

    });




  },


  /**
   * `Admin/AdminYetkiTipleriController.edit()`
   */
  edit: function (req, res) {


    var id=req.param('id');

    YetkiTipi.findOne({
      id:id
    }).exec(function (err, yetkitipi){
      if (err) {
        return res.negotiate(err);
      }
      if (!yetkitipi) {
        return res.notFound('Could not find Finn, sorry.');
      }


      res.view('admin/yetkitipi/edit',{layout:'admin/layout',yetkitipi:yetkitipi});
    });
  },


  /**
   * `Admin/AdminYetkiTipleriController.update()`
   */
  update: function (req, res) {



    YetkiTipi.findOne(req.body.id).exec(function(error, yetki) {
      if(error) {
        // do something with the error.
      }

      if(req.body.gorev) {

        yetki.gorev = req.body.gorev;
      }
      if(req.body.yetkiderecesi) {

        yetki.yetkiDerecesi = req.body.yetkiderecesi;
      }

      yetki.save(function(error) {
        if(error) {
          // do something with the error.
        } else {
          // value saved!
          return res.redirect('/admin/yetkitipi/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `Admin/AdminYetkiTipleriController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    YetkiTipi.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/yetkitipi/');
      });
  }


};

