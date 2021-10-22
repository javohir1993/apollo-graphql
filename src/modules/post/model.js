const { rows, row } = require('../../../utils/pg')

const model = {

  many: async () => {
    const SQL = `
      select * from posts;
    `
    const result = await rows(SQL)
    return result
  },

  perPage: async (page, limit) => {
    const SQL = `
      select * from posts
      offset (($1 - 1) * $2) limit $2
    `
    const result = await rows(SQL, page, limit)
    return result
  },

  byPostId: async (postId) => {
    const SQL = `
      select * from posts where post_id = $1
    `
    const result = await rows(SQL, postId)
    return result
  },

  byUserId: async (userId) => {
    const SQL = `
      select * from posts where user_id = $1
    `
    const result = await rows(SQL, userId)
    return result
  },

  createPost: async (title, content, userId) => {
    const SQL = `
      insert into posts (post_title, post_content, user_id) values
      ($1, $2, $3) returning *
    `
    const result = await row(SQL, title, content, userId)
    return result
  },

  updatePost: async (title, content, postId, userId) => {
    const SQL = `
      update posts set post_title = $1, post_content = $2
      where post_id = $3 and user_id = $4
      returning *
    `
    const result = await row(SQL, title, content, postId, userId)
    return result
  },

  deletePost: async (postId, userId) => {

    const SQL_DISABLE_TRIGGER = `ALTER TABLE posts DISABLE TRIGGER ALL`

    const SQL_DELETE_POST = `
      delete from posts where post_id = $1 and user_id = $2
      returning post_title, post_content;
    `
    const SQL_ENABLE_TRIGGER = `ALTER TABLE posts ENABLE TRIGGER ALL;`

    await row(SQL_DISABLE_TRIGGER)

    const result = await row(SQL_DELETE_POST, postId, userId)

    await row(SQL_ENABLE_TRIGGER)

    return result
  },

}

module.exports = model