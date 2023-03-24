<template>
  <div class="content">
    <div class="cc">
      <h3>for...of</h3>
      <h3>{{ list }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-forOf',
  data() {
    return {
      list: ['1', '2', '3', '4', '5'],
      mlist: [
        {
          name: 'john',
          id: '1'
        },
        {
          name: 'john2',
          id: '2'
        },
        {
          name: 'john3',
          id: '3'
        }
      ],
      repeatList: [
        {
          name: 'john',
          id: '1'
        },
        {
          name: 'mary',
          id: '1'
        },
        {
          name: 'john2',
          id: '2'
        },
        {
          name: 'john3',
          id: '3'
        }
      ],
      repeatCount: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // for (let i = 0; i < this.list.length; i++) {
      //   if (this.list[i] > 2) {
      //     break
      //   }
      //   console.log(this.list[i])
      // }
      // -----------------------------------------------------------
      // for (const item of this.list) {
      //   if (item > 2) {
      //     break
      //   }
      //   console.log(item)
      // }
      // -----------------------------------------------------------
      // this.list.forEach((item, index, arr) => {
      //   if (item === '3') return
      //   // console.log(index)
      //   console.log(item)
      // })
      // -----------------------------------------------------------
      // const msome = this.mlist.some(val => {
      //   return val.id === '6'
      // })
      // console.log(msome)
      // -----------------------------------------------------------
      // const mevery = this.mlist.every(val => {
      //   return Number(val.id) < 2
      // })
      // console.log(mevery)
      // -----------------------------------------------------------
      // const resultList = this.mlist.filter(val => {
      //   return Number(val.id) > 1
      // })
      // console.log(resultList)
      // -----------------------------------------------------------
      // const resultList = this.mlist.map(val => {
      // return Number(val.id) > 1 // [false, true, true]
      // return Number(val.id) // [1, 2, 3]
      // })
      // console.log(resultList)
      // -----------------------------------------------------------
      // const resultList = this.mlist.find(val => {
      //   return (val.id === '2')
      // })
      // console.log(resultList)
      // -----------------------------------------------------------
      // const resultList = this.mlist.findIndex(val => {
      //   return (val.id === '2')
      // })
      // console.log(resultList)
      // console.log(this.mlist[resultList].name)
      // -----------------------------------------------------------
      /* 如果不传入初始值，reduce 方法会从索引 1 开始执行回调函数，如果传入初始值，将从索引 0 开始、并从初始值的基础上累计执行回调。 */
      // const total = this.mlist.reduce((currentTotal, item) => {
      //   return currentTotal + Number(item.id)
      // }, 0)
      // console.log(total)
      // -----------------------------------------------------------
      /* 对象数组的去重，并统计每一项重复次数 */
      // const resultList = this.repeatList.reduce((arr, item) => {
      //   if (this.repeatCount[item.id]) {
      //     this.repeatCount[item.id]++
      //     return arr
      //   }
      //   this.repeatCount[item.id] = 1
      //   return [...arr, item]
      // }, [])
      // console.log(resultList)
      // console.log(this.repeatCount)
      // -----------------------------------------------------------
      /* 对象数组最大/最小值获取 */
      //   const list = [
      //     { name: 'left', width: 20 },
      //     { name: 'right', width: 30 },
      //     { name: 'center', width: 70 },
      //     { name: 'top', width: 40 },
      //     { name: 'bottom', width: 20 }
      //   ]
      //   const max = list.reduce((curItem, item) => {
      //     return curItem.width >= item.width ? curItem : item
      //   })
      //   const min = list.reduce((curItem, item) => {
      //     return curItem.width <= item.width ? curItem : item
      //   })
      //   console.log(max)
      //   console.log(min)
      // }
      // -----------------------------------------------------------
      /* 对象数组最大/最小值获取 */
      // const list = [1, 2, 3, 4, 5, 6]
      // const max = list.reduce((curItem, item) => {
      //   return curItem >= item ? curItem : item
      // })
      // const min = list.reduce((curItem, item) => {
      //   return curItem <= item ? curItem : item
      // })
      // console.log(max)
      // console.log(min)
    }
  }
}
</script>
<style lang="scss" scoped>
.cc {
  h3 {
    font-size: 14px;
  }
}
</style>
