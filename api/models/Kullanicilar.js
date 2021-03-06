/**
 * Kullanicilar.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    isim: {type: 'string'},

    soyIsim: {

      type: 'string',
      size: 45

    },
    email: {type: 'string'},

    sifre: {type: 'string'},


    hesapDurum: {

      type: 'integer'

    },

    gorevId: {
      model: 'yetkitipi'
    },

    iletisimBilgisi: {
      collection: 'iletisim',
      via: 'kullaniciId'
    },

    sikayetler: {
      collection: 'sikayetler',
      via: 'kullaniciId'
    },

    bloklar: {
      collection: 'blok',
      via: 'kullaniciId'
    }
  }


};

