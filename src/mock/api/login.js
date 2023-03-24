const userDB = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '用户1' }
]

export default [
  {
    path: '/api/login',
    method: 'post',
    handle({ body }) {
      debugger
      const user = userDB.find((e) => e.username === body.username && e.password === body.password)
      if (user) {
        return {
          ...user,
          token: '8dfhassad0asdjwoeiruty',
          session_userID: '8dfhassad0asdjwoeiruty',
          session_lastLogonIP: '127.0.0.1'
        }
      } else {
        return {
          status: '404'
        }
      }
    }
  }
]
