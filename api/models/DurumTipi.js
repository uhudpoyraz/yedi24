/**
 * DurumTip.js
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

    durumtipi:{
      model:'durumlar',
      unique: true
    }

  }
};
