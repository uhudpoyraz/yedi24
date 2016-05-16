/**
 * Admin/AdminKaralisteController
 *
 * @description :: Server-side logic for managing admin/adminsiteayars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `Admin/AdminKaralisteController.add()`
   */
  add: function (req, res) {
    req.flash('karaliste', 'active');

    res.view('admin/karaliste/add', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminKaralisteController.save()`
   */
  save: function (req, res) {
    var email=req.param('email');
    KaraListe.create({email:email,}).exec(function createCB(err, created){
      console.log('Created email with name ' + created.email);
            if(err) {
              return res.json({
                todo: 'hata olustu'
              });
            }
      if (err) {
        //Handle Error
      }
      return res.redirect('/admin/karaliste/add')
    });
  },


  /**
   * `Admin/AdminKaraListeController.list()`
   */
  list: function (req, res) {
    req.flash('karaliste', 'active');

    KaraListe.find(function(err, karaliste) {
      if (err) {return res.serverError(err);}

      return res.view('admin/karaliste/list',{layout:'admin/layout',karaliste: karaliste});

    });
  },


  /**
   * `Admin/AdminKaraListeController.edit()`
   */
  edit: function (req, res) {
    req.flash('karaliste', 'active');

    var id=req.param('id');

    KaraListe.findOne({
      id:id
    }).exec(function (err, kayıt){
        if (err) {
          return res.negotiate(err);
        }
        if (!kayıt) {
          return res.notFound('Could not find Finn, sorry.');
        }


    res.view('admin/karaliste/edit',{layout:'admin/layout',kayıt:kayıt});
    });

  },


  /**
   * `Admin/AdminKaraListeController.update()`
   */
  update: function (req, res) {
    KaraListe.findOne(req.body.id).exec(function(error, kayıt) {
      if(error) {
        // do something with the error.
      }

      if(req.body.email) {

        kayıt.email = req.body.email;
      }

        kayıt.save(function(error) {
        if(error) {
          // do something with the error.
        } else {
          // value saved!
          return res.redirect('/admin/karaliste/edit/'+req.body.id);
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

    KaraListe.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/karaliste/');
      });
  }
};

