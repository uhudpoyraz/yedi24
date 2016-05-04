/**
 * AnasayfaController
 *
 * @description :: Server-side logic for managing anasayfas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  index: function (req, res) {
  
    var binalar = Bina.find(function (err, binalar) {
      if (err) {
        return res.serverError(err);
      }

      return res.view("index", {binalar: binalar});

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

  userRegister:function (req,res) {1

    var name= req.param("name");
    var surname=req.param("surname");
    var email=req.param("email");
    var password=req.param("password");

    Kullanicilar.create({isim: name, soyIsim: surname, email:email, sifre:password, hesapDurum: 0, gorevId:0}).exec(function createCB(err, created){
      console.log('Created email with name ' + created.email);
      if(err) {
        return res.json({succes:false,message:'Sorun Oluştur.'});
      }
      return res.json({succes:true,message:'Kayit Başarıyla Tamamlanmıştır.'});

    });



  }

}
