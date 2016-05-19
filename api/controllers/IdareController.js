/**
 * SikayetController
 *
 * @description :: Server-side logic for managing kullanicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {







  index: function (req, res) {


      res.view("front/idare/index");


  },



  /**
   * `Admin/AdminSikayetController.aktar()`
   */

  aktar: function (req, res) {

    var sikayetId   = req.param('id');

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
    var ilgiliId=req.session.kullaniciDetay.id;

    var query='SELECT  durumtipi.isim as durumtipismi,s.id as sikayetlerid,aciklama,birim.isim as birimismi FROM sikayetler s ' +
      '    INNER JOIN birim ON birim.id = s."birimId"' +
      '    INNER JOIN durumlar ON s.id = durumlar."sikayetId"' +
      '    INNER JOIN durumtipi ON durumlar."durumTipId" = durumtipi.id' +
      '     where durumlar."sikayetIlgiliId"='+ilgiliId+' and s.id='+sikayetId+ ' and durumlar."durumBitis" IS NULL ';


      console.log(query);
    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}


      return res.view('front/idare/sikayet/add',{sikayetler: sikayetler,kullanicilar:users,durumtipleri:durumtipleri});


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

        Durumlar.findOne().where({durumBitis:null,sikayetId:sikayetId}).sort({createdAt: 'asc'}) .exec(function(error, durumlar) {
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
            } console.log('Created email with name ' + durumlar.durumBitis);
          });

          }
        });


        req.flash('message','Kayit Başarılı.');
        req.flash('type','success');
        req.flash('icon', 'check');


      }
      return res.redirect('/'+sikayetId);
    });
  },


  durumlarList: function (req, res) {
    var limit=req.param("limit");
    var offset=req.param("offset");
    var sikayetId=req.param("sikayetId");


    var query='select *,durumtipi.isim as durumtipisim,durumlar."createdAt" as durumkayit,kullanicilar.isim as kullaniciisim from durumlar ' +
      '    INNER JOIN durumtipi ON durumlar."durumTipId" = durumtipi.id' +
      '    INNER JOIN kullanicilar ON kullanicilar.id = durumlar."sikayetIlgiliId"' +
      ' where "sikayetId"='+sikayetId+' order by durumlar."createdAt" DESC limit '+limit+' offset '+offset;


console.log(query);
    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}

      var query2='select count(*) as toplam from durumlar ' +
        '    INNER JOIN durumtipi ON durumlar."durumTipId" = durumtipi.id' +
        ' where  "sikayetId"='+sikayetId;

      Sikayetler.query(query2, function(err, found) {

        var result={};

        result.total=found.rows[0].toplam;
        result.rows=sikayetler.rows;

        return res.json(result);


      });


    });


  },





  idariSikayetList: function (req, res) {

    var limit=req.param("limit");
    var offset=req.param("offset");
    var order=req.param("order");
    var sort=req.param("sort");


    if(!sort){

      sort='s."createdAt"';
      order="desc"
    }
    var blokId=5;
    var ilgiliId=req.session.kullaniciDetay.id;
    var query='SELECT s.id as sikayetlerid,aciklama,birim.isim as birimismi,durumlar.id as durumid,durumtipi.isim as durumtipisim FROM sikayetler s ' +
      '    INNER JOIN birim ON birim.id = s."birimId"' +
      '    INNER JOIN durumlar ON s.id = durumlar."sikayetId"' +
      '    INNER JOIN durumtipi ON durumtipi.id = durumlar."durumTipId"' +
      '     where durumlar."sikayetIlgiliId"='+ilgiliId+' and durumlar."durumBitis"  IS NULL'+ ' order by '+sort+' '+order+' limit '+limit+' offset '+offset;



    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}

      var query2='SELECT count(*) as toplam FROM sikayetler s ' +
        '    INNER JOIN birim ON birim.id = s."birimId"' +
        '    INNER JOIN durumlar ON s.id = durumlar."sikayetId"' +
        '    INNER JOIN durumtipi ON durumtipi.id = durumlar."durumTipId"' +
        '     where durumlar."sikayetIlgiliId"='+ilgiliId+' and durumlar."durumBitis"  IS NULL';

      Sikayetler.query(query2, function(err, found) {

        var result={};

        result.total=found.rows[0].toplam;
        result.rows=sikayetler.rows;

        return res.json(result);


      });


    });


  }
};



