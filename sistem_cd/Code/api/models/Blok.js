/**
 * Blok.js
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

    isim:{

      type:'string'
    },
    kod:{

      type:'string'

    },
    kullaniciId: {
      model: 'kullanicilar'
    },
    binaId: {
      model: 'Bina'
    },
    birimler: {
      collection: 'birim',
      via: 'blokId'
    }
  }
};
