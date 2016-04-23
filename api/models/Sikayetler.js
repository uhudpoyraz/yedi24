/**
 * Sikayet.js
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


    aciklama:{

      type:'text'

    },

    birimId:{

      type:'integer'

    },

    kullaniciId: {
      model: 'kullanicilar'
    },

    durumlar: {
    collection: 'durumlar',
    via: 'sikayetId'
  }
  }
};

