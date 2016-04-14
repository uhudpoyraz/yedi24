/**
 * Created by uhudpoyraz on 15.04.2016.
 */


module.exports = {
  tableName: 'users',
  attribute: {

    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },

    name: {

      type: 'string',
      size: 45

    },
    surName: {

      type: 'string',
      size: 45

    },
    email: {

      type: 'string',
      size: 45

    },
    password: {

      type: 'string',
      size: 45

    },
    gorevId: {

      type: 'integer',
      size: 2
    },

    createdAt: {

      type: 'datetime'

    },

    accountState: {

      type: 'boolean'

    }

  }
}
