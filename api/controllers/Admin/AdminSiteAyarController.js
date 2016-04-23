/**
 * Admin/AdminSiteAyarController
 *
 * @description :: Server-side logic for managing admin/adminsiteayars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `Admin/AdminSiteAyarController.add()`
   */
  add: function (req, res) {

    res.view('admin/ayar/add', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminSiteAyarController.save()`
   */
  save: function (req, res) {
    var name=req.param('name');
    var value=req.param('value');
    Parametre.create({isim:name,deger:value}).exec(function createCB(err, created){
      console.log('Created parameter with name ' + created.isim);
            if(err) {
              return res.json({
                todo: 'hata olustu'
              });
            }
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin/ayar/add')
    });
  },


  /**
   * `Admin/AdminSiteAyarController.list()`
   */
  list: function (req, res) {

    Parametre.find(function(err, parametreler) {
      if (err) {return res.serverError(err);}

      return res.view('admin/ayar/list',{layout:'admin/layout',parametreler: parametreler});

    });
  },


  /**
   * `Admin/AdminSiteAyarController.edit()`
   */
  edit: function (req, res) {

    var id=req.param('id');

    Parametre.findOne({
      id:id
    }).exec(function (err, parametre){
        if (err) {
          return res.negotiate(err);
        }
        if (!parametre) {
          return res.notFound('Could not find Finn, sorry.');
        }


    res.view('admin/ayar/edit',{layout:'admin/layout',parametre:parametre});
    });

  },


  /**
   * `Admin/AdminSiteAyarController.update()`
   */
  update: function (req, res) {
    Parametre.findOne(req.body.id).exec(function(error, parametre) {
      if(error) {
        // do something with the error.
      }

      if(req.body.name) {

        parametre.isim = req.body.name;
      }
        if(req.body.value) {

          parametre.deger = req.body.value;
        }

        parametre.save(function(error) {
        if(error) {
          // do something with the error.
        } else {
          // value saved!
          return res.redirect('/admin/ayar/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `Admin/AdminSiteAyarController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    Parametre.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/ayar/');
      });
  }
};

