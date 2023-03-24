class ValiUtil {
  // 构造函数会在创建对象的时候调用
  constructor(val) {
    // 在构造函数中当前对象就是当前创建的对象
    // 可以通过this向新建对象中添加属性
    this.item = val
  }

  checkType(item) {
    this.item = item
    if (typeof item === 'string') {
      console.log('string' + this.item)
    }
    return this
  }

  static onlyNum(val) {
    console.log(val)
  }
}

// 继承父类的所有方法和属性
class ValiSm extends ValiUtil {
  constructor(name) {
    // 调用父类构造器
    // 如果在子类写了构造函数 在子类的构造函数中必须对父类的构造函数进行调用
    super()
    this.name = name
  }

  turnPage(val, item) {
    this.name = val
    this.item = item
    console.log('page' + this.name + this.item)
    return this
  }
}

export { ValiSm, ValiUtil }
