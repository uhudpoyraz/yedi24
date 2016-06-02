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


    sikayetIlgiliId:{

      type:'integer'


    },

    durumTipId:{

      model:'durumtipi'

    },
    durumBitis:{

      type:'datetime',
      required: false

    }
    ,
    sikayetId: {
      model: 'sikayetler'
    },

    eklentiler: {
      collection: 'eklentiler',
      via: 'durumId'
    },


  }
};

