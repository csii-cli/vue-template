import vxMock from './mock'

const req = (context) => context.keys().map(context)
const options = req(require.context('./api/', true, /\.js$/))
  .filter((e) => e.default)
  .map((e) => e.default)

options.forEach((option) => {
  vxMock.load(option)
})

// 遍历 `./data/` 目录下的json文件，生成mock配置
// json文件名为拦截的目标.do，json文件的内容作为返回的模拟数据
const reqJSON = (ctx) => {
  const keys = ctx.keys()
  const values = ctx.keys().map(ctx)
  return keys.map((val, ind) => {
    const action = val.replace('.json', '.do').replace('./', '')
    const item = {
      path: `${action}$`,
      method: 'post',
      handle() {
        return values[ind]
      }
    }
    return item
  })
}
const jsonfiles = reqJSON(require.context('./data/', true, /\.json$/))
jsonfiles.forEach((c) => {
  vxMock.load([c])
})
