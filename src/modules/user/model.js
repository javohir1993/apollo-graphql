const { rows, row } = require('../../../utils/pg')

const model = {

  many: async () => {
    const SQL = `
      select
        user_id,
        username
      from
        users
    `
    const result = await rows(SQL)
    return result
  },

  byId: async (userId) => {
    const SQL = `
      select
        user_id,
        username
      from
        users
      where
        user_id = $1
    `
    const result = await row(SQL, userId)
    return result
  },

  signup: async (username, password) => {
    const SQL = `
      insert into users (username, password) values
      ($1, crypt($2, gen_salt('bf')))
      returning user_id, username
    `
    const result = await row(SQL, username, password)
    return result
  },

  signin: async (username, password) => {
    const SQL = `
      select
        username,
        user_id
      from users
      where username = $1 and password = crypt($2, password)
    `
    const result = await row(SQL, username, password)
    return result
  },

  updateUser: async (userId, username) => {
    const SQL = `
      update users set username = $1 where user_id = $2
      returning user_id, username
    `
    const result = await row(SQL, username, userId)
    return result
  },

  delUser: async (userId) => {
    const SQL_DISABLE_TRIGGER = `ALTER TABLE users DISABLE TRIGGER ALL`

    const SQL_DELETE_USER = `delete from users where user_id = $1 returning user_id, username;`

    const SQL_ENABLE_TRIGGER = `ALTER TABLE users ENABLE TRIGGER ALL;`

    await row(SQL_DISABLE_TRIGGER)

    const result = await row(SQL_DELETE_USER, userId)

    await row(SQL_ENABLE_TRIGGER)

    return result
  },

}

module.exports = model