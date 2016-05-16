/**
 * Admin/SikayetDurumTipiController
 *
 * @description :: Server-side logic for managing admin/durumtipis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AdminSikayetDurumTipiController.add()`
   */
  add: function (req, res) {

    req.flash('sikayetDurumTipi', 'active');
    res.view('admin/sikayetdurumtipi/add', {layout: 'admin/layout'});

  },


  /**
   * `AdminSikayetDurumTipiController.save()`
   */
  save: function (req, res) {

    var name=req.param('name');
    var surec=req.param('surec');
    DurumTipi.create({isim:name,surec:surec}).exec(function createCB(err, created){
      console.log('Created sikayetdurumtipi with deger ' + created.isim);
      if(err) {
        return res.json({
          todo: 'hata olustu'
        });
      }
      if (err) {
        //Handle Error
      }
      req.flash('message', 'Sikayet Durum Tipi Eklendi');
      return res.redirect('/admin/sikayetdurumtipi/add')
    });

  },


  /**
   * `AdminSikayetDurumTipiController.list()`
   */
  list: function (req, res) {


    DurumTipi.find(function(err, durumtipleri) {
      if (err) {return res.serverError(err);}
      req.flash('sikayetDurumTipi', 'active');
      return res.view('admin/sikayetdurumtipi/list',{layout:'admin/layout',durumtipleri: durumtipleri});

    });

  },


  /**
   * `AdminSikayetDurumTipiController.edit()`
   */
  edit: function (req, res) {


    var id=req.param('id');

    DurumTipi.findOne({
      id:id
    }).exec(function (err, sikayetdurumtipi){
      if (err) {
        return res.negotiate(err);
      }
      if (!sikayetdurumtipi) {
        return res.notFound('Could not find Finn, sorry.');
      }

      req.flash('sikayetDurumTipi', 'active');
      res.view('admin/sikayetdurumtipi/edit',{layout:'admin/layout',sikayetdurumtipi:sikayetdurumtipi});
    });
  },


  /**
   * `AdminSikayetDurumTipiController.update()`
   */
  update: function (req, res) {



    DurumTipi.findOne(req.body.id).exec(function(error, sikayetdurumtipi) {
      if(error) {
        return res.json({
          todo: 'hata olustu'
        });

      }

      if(req.body.name) {

        sikayetdurumtipi.isim= req.body.name;
      }
      if(req.body.surec) {

        sikayetdurumtipi.surec= req.body.surec;
      }

      sikayetdurumtipi.save(function(error) {
        if(error) {
          // do something with the error.
        } else {
          // value saved!
          return res.redirect('/admin/sikayetdurumtipi/edit/'+req.body.id);
        }
      });
    });
  },


  /**
   * `AdminSikayetDurumTipiController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },

  delete: function (req, res) {

    var id=req.param('id');

    DurumTipi.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/sikayetdurumtipi/');
      });
  }


};

