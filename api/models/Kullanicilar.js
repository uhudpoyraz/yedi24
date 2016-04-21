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



    gorevId: {

      type: 'integer',
      size: 2
    },

    hesapDurum: {

      type: 'boolean'

    },

    iletisimBilgisi: {
      collection: 'iletisim',
      via: 'kullanici'
    },
    gorev: {
      model: 'yetkilendirme'
    },

    sikayetler: {
      collection: 'sikayetler',
      via: 'kullanici'
    },

    bloklar: {
      collection: 'blok',
      via: 'kullanici'
    },

  }
};

