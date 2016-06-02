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
    req.flash('yetkitipleri', 'active');


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
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {
        
      
      req.flash('message','Kayit Başarılı.');
      req.flash('type','success');
      req.flash('icon', 'check');
    }
      return res.redirect('/admin/yetkitipi/add')
    });

  },


  /**
   * `Admin/AdminYetkiTipleriController.list()`
   */
  list: function (req, res) {
    req.flash('yetkitipleri', 'active');

    var myQuery = YetkiTipi.find();

    myQuery.sort('yetkiDerecesi ASC');

    myQuery.exec(function callBack(err,yetkitipleri){
      if (err) {return res.serverError(err);}
      return res.view('admin/yetkitipi/list',{layout:'admin/layout',yetkitipleri: yetkitipleri});
    });
  },


  /**
   * `Admin/AdminYetkiTipleriController.edit()`
   */
  edit: function (req, res) {
    req.flash('yetkitipleri', 'active');


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
          req.flash('message','Sorun Oluştu.');
          req.flash('type','danger');
          req.flash('icon', 'ban');
        } else {
          req.flash('message','Güncelleme Başarılı.');
          req.flash('type','success');
          req.flash('icon', 'check');
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
      Kullanicilar.findOne({
        gorevId:id
      }).exec(function (err, kullanici){
        if (err) {
          return res.negotiate(err);
        }else {
          if (kullanici !=null) {
              req.flash('message','Kullanılan kaydı silemezsiniz.');
              req.flash('type','danger');
              req.flash('icon', 'ban');
              return res.redirect('/admin/yetkitipi/');
          }else{
            req.flash('message','Güncelleme Başarılı.');
            req.flash('type','success');
            req.flash('icon', 'check');
            YetkiTipi.destroy({id: id}).exec(function(e,r){
              return res.redirect('/admin/yetkitipi/'); 
            });
          }
        }
    });
  }


};

