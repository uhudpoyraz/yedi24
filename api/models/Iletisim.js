/**
 * IletisimToUsers.js
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

    kullaniciId:{

      type:'integer'

    },

    iletisimTipId:{

      type:'integer'

    },

    deger:{

      type:'string'

    },
    kullanici: {
      model: 'kullanicilar'
    },
    Iletisimtipi: {
      model: 'iletisimtipi'
    },

  }
};

