const { rows, row } = require('../../../utils/pg')

const model = {
  many: async () => {
    const SQL = `
      select * from comments
    `
    const result = await rows(SQL)
    return result
  },

  byId: async (postId) => {
    const SQL = `
      select * from comments where post_id = $1
    `
    const result = await rows(SQL, postId)
    return result
  }
}

module.exports = model