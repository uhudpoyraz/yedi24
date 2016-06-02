/**
 * SikayetController
 *
 * @description :: Server-side logic for managing kullanicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


  /**
   * `Admin/AdminSikayetController.aktar()`
   */

  aktar: function (req, res) {
    req.flash('sikayetlistesi', 'active');

    var id=req.param('id');
    var users;
    var durumtipleri;
    
    
    Kullanicilar.find(function(err, kullanicilar) {
      if (err) {return res.serverError(err);}
      users = kullanicilar;
    });
    DurumTipi.find(function(err, durumtipi) {
      if (err) {return res.serverError(err);}
      durumtipleri = durumtipi;
    });
    var blokId=5;
    var ilgiliId=req.session.AdminkullaniciDetay.id;
    
    var query='SELECT s.id as sikayetlerid,aciklama,birim.isim as birimismi FROM sikayetler s ' +
      '    INNER JOIN birim ON birim.id = s."birimId"' +
      '    INNER JOIN durumlar ON s.id = durumlar."sikayetId"' +
      '     where durumlar."sikayetIlgiliId"='+ilgiliId+' and s.id='+id;



    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}

      //  return res.json(sikayetler);
      return res.view('admin/sikayet/add',{layout:'admin/layout',sikayetler: sikayetler,kullanicilar:users,durumtipleri:durumtipleri});


    });


  },



  save: function (req, res) {
    var sikayetId   = req.param('sikayetId');
    var durumTipiId = req.param('durumTipiId');
    var kullaniciId = req.param('kullaniciId');



    Durumlar.create({sikayetIlgiliId: kullaniciId, durumTipId: durumTipiId, sikayetId:sikayetId,durumBitis:null}).exec(function createCB(err, created){
      console.log(err);
      if(err) {
        req.flash('message','Sorun Oluştu');
        req.flash('type','danger');
        req.flash('icon', 'ban');
      }else {

        Durumlar.findOne().where({durumBitis:null}).sort({createdAt: 'asc'}) .exec(function(error, durumlar) {
          if(error) {

          }else {
            durumlar.durumBitis="2017-05-18 19:57:41+03";

            durumlar.save(function(error) {
            if(error) {
              req.flash('message','Sorun Oluştu.');
              req.flash('type','danger');
              req.flash('icon', 'ban');
            } else {
              req.flash('message','Güncelleme Başarılı.');
              req.flash('type','success');
              req.flash('icon', 'check');
            }
          });

          }
        });

        console.log('Created email with name ' + created.email);
        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');


      }
      return res.redirect('/admin/sikayet/aktar/'+sikayetId);
    });
  },


  /**
   * `Admin/AdminSikayetController.list()`
   */
  list: function (req, res) {
    req.flash('sikayet', 'active');

    var blokId=5;
    var ilgiliId=req.session.AdminkullaniciDetay.id;
    var query='SELECT s.id as sikayetlerid,aciklama,birim.isim as birimismi,durumlar.id as durumid,durumtipi.isim as durumtipisim FROM sikayetler s ' +
      '    INNER JOIN birim ON birim.id = s."birimId"' +
      '    INNER JOIN durumlar ON s.id = durumlar."sikayetId"' +
      '    INNER JOIN durumtipi ON durumtipi.id = durumlar."durumTipId"' +
      '     where durumlar."sikayetIlgiliId"='+ilgiliId+' and durumlar."durumBitis"  IS NULL';



    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}

     //  return res.json(sikayetler);
        return res.view('admin/sikayet/list',{layout:'admin/layout',sikayetler: sikayetler});


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
    Sikayetler.destroy({id: id})
      .exec(function(e,r){

        return res.redirect('/admin/sikayet/');
      });
  }
};



