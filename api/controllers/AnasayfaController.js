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

    var complainSubject= req.param("complainSubject");
    var complainContent=req.param("complainContent");
    var birimId=req.param("birimId");

    if(req.session.kullaniciDetay!=null){
      var kullaniciId=req.session.kullaniciDetay.id;
    }else {
      var kullaniciId=1;

    }
    Sikayetler.create({aciklama: complainContent,birimId:birimId,kullaniciId:kullaniciId }).exec(function createCB(err, created){
      console.log('Created sikayet with birimId ' + created.birimId);
      if(err) {
        return res.json({succes:false,message:'Sorun Oluştur.'});
      }
      return res.json({succes:true,message:'Kayit Başarıyla Tamamlanmıştır.'});

    });
  },


  sikayetListesi:function (req,res) {

    //burada nested ilislileri çekmek gerekcek ayrıca bina blok ve birim e gore where sartı koyulması gerekiyor

    var limit=req.param("limit");
    var offset=req.param("offset");
    var binaId=req.param("binaId");
    var birimId=req.param("birimId");
    var blokId=req.param("blokId");

    Sikayetler.find({skip:offset,limit:limit}).populate("birimId").exec(function(err, sikayetler) {

        if (err) {return res.serverError(err);}


      Sikayetler.count().exec(function countCB(error, found) {
        return res.json({"total":found,"rows":sikayetler});


      });

      });
  }


};
