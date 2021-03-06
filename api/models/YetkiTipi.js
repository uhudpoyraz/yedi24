/**
 * YetkiTipi.js
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

    gorev:{

      type:'string'

    },

    yetkiDerecesi:{

      type:'float'

    },

    kullanicilar: {
      collection: 'kullanicilar',
      via: 'gorevId'
    },

  }
};

