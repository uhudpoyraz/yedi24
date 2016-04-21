/**
 * Durum.js
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

    sikayetId:{

      type:'integer'

    },
    sikayetIlgiliId:{

      type:'integer'


    },

    durumTipId:{

      type:'integer'

    },
    durumBitis:{

      type:'datetime'

    }
    ,
    durum: {
      model: 'sikayetler'
    },

    eklentiler: {
      collection: 'eklentiler',
      via: 'durum'
    },
    durumtipi: {
      collection:'durumTipi',
      via: 'durumtipi'
    }

  }
};

