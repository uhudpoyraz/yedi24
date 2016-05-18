/**
 * AnasayfaController
 *
 * @description :: Server-side logic for managing anasayfas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  index: function (req, res) {

        Bina.find(function (err, binalar) {
          if (err) {
            return res.serverError(err);
          }


          res.view("index", {binalar: binalar});

        });



  },

  /**
   * `AnasayfaController.binaList()`
   */
  binaList: function () {
    Bina.find(function (err, binalar) {
      if (err) {
        return res.serverError(err);
      }

      return binalar;

    });

  },


  /**
   * `AnasayfaController.blokList()`
   */
  blokList: function (req, res) {

    var binaId = req.param('binaid');
    console.log("binaId" + binaId);
    Blok.find({binaId: binaId}).exec(function (err, blokByBina) {
      if (err) {
        return res.negotiate(err);
      }

      return res.json({"bloklar": blokByBina});

    });
  },


  /**
   * `AnasayfaController.birimList()`
   */
  birimList: function (req, res) {


    var blokId = req.param('blokid');
    console.log("blokId" + blokId);
    Birim.find({blokId: blokId}).exec(function (err, birimByBlok) {
      if (err) {
        return res.negotiate(err);
      }

      return res.json({"birimler": birimByBlok});

    });
  },

  userRegister:function (req,res) {

    var name= req.param("name");
    var surname=req.param("surname");
    var email=req.param("email");
    var password=req.param("password");
    var crypto = require('crypto');
    var passwordHash= crypto.createHash('sha1').update(password).digest('hex');

    Kullanicilar.create({isim: name, soyIsim: surname, email:email, sifre:passwordHash, hesapDurum: 0, gorevId:0}).exec(function createCB(err, created){
      console.log('Created email with name ' + created.email);
      if(err) {
        return res.json({succes:false,message:'Sorun Oluştur.'});
      }
      return res.json({succes:true,message:'Kayit Başarıyla Tamamlanmıştır.'});

    });
  },

  sikayetKayit:function (req,res) {
    //Upload
    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.
    console.log(req.params.all());
    req.file('ek').upload({dirname: '../../assets/images/upload/ek' }, function (error, uploadedFiles) 
      {
        console.log(error);
        if (!error)
        {
          console.log(uploadedFiles);
          if ( uploadedFiles.length > 0) 
          {
              console.log(uploadedFiles[0].fd+"bura mı?");

              var complainSubject= req.param("complainSubject");
              var complainContent=req.param("complainContent");
              var birimId=req.param("birimid");
              var kullaniciId=-1;
              var birimSorumluId=-1;
              
              if(req.session.kullaniciDetay!=null){
                var kullaniciId=req.session.kullaniciDetay.id;
              }

              Sikayetler.create({aciklama: complainContent,birimId:birimId,kullaniciId:kullaniciId }).exec(function createCB(err, created){
                console.log('Created sikayet with birimId ' + created.birimId);
                if(err) {
                  return res.json({succes:false,message:'Sorun Oluştur.'});
                }
                

                Birim.findOne({id: created.birimId}).exec(function (err, record){
                  if(err) {
                    console.log("Birim eklenmesinde hata oluştu.");
                  }
                  Blok.findOne({id: record.blokId}).exec(function (err, blok){
                    if(err) {
                      console.log("Birim eklenmesinde hata oluştu.");
                    }
                    // Yeni Şikayet 1
                    // Alındı 2
                    // Yetkiliye Aktarıldı 3
                    // Yedek Parça 4
                    // Tamamlandı 5
                      Durumlar.create({sikayetIlgiliId: blok.kullaniciId, durumTipId:1, durumBitis:null, sikayetId:created.id }).exec(function createCB(err, created){
                      if(err) {
                        console.log("Yeni Şikayet Durum eklenmesinde hata oluştu.");
                        return res.serverError(err);
                      }else{
                        console.log("Yeni Şikayet Durum eklendi.");
                        return res.json({succes:true,message:'Kayit Başarıyla Tamamlanmıştır.'});
                      }
                    });
                  });
                });
              });
          }
          else{
            return res.json(error);
          }
        }
    });
    
  },

  sikayetListesi:function (req,res) {

    var limit=req.param("limit");
    var offset=req.param("offset");
    var binaId=req.param("binaId");
    var birimId=req.param("birimId");
    var blokId=req.param("blokId");

    var where='';

    if(binaId!=0 || birimId!=0 || blokId!=0|| req.session.kullaniciDetay!=null){

      where='where '
    }

     if(binaId!=0){

      where+='bina.id='+binaId+" and ";

    }
    if(birimId!=0){
      where+='birim.id='+birimId+" and ";
    }
     if(blokId!=0){
       where+='blok.id='+blokId+" and ";
    }

    if(req.session.kullaniciDetay!=null){
      where+='s."kullaniciId"='+req.session.kullaniciDetay.id+" and ";
    }

    if(binaId!=0 || birimId!=0 || blokId!=0|| req.session.kullaniciDetay!=null){

      where=where.substr(0,where.length-5);
    }

    var query='SELECT s.id as sikayetlerid,aciklama,bina.isim as binaIsmi,blok.isim as blokIsmi,birim.isim as birimIsmi FROM sikayetler s INNER JOIN birim ON birim.id = s."birimId"' +
      '    INNER JOIN blok ON blok.id = birim."blokId"' +
      '    INNER JOIN bina ON bina.id = blok."binaId"'+where+' limit '+limit+' offset '+offset;


    Sikayetler.query(query, function(err, sikayetler) {

      if (err) {return res.serverError(err);}

      Sikayetler.count().exec(function countCB(error, found) {
      //  sikayetler.rows=sikayetler.rows.rows;
      var result={};
        result.total=found;
        result.rows=sikayetler.rows;
        return res.json(result);


      });
    });

  }


};
