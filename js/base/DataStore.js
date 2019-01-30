/*
 * @Description: 变量缓存器，方便在不同类中访问和修改变量
 * @Author: ma.cq
 * @Date: 2019-01-28 10:46:09
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-28 16:21:51
 */
export class DataStore {
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor () {
    // 需要随游戏一轮销毁的放入map，不需要的直接挂载在store对象上
    this.map = new Map()
  }

  put (key, value) {
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this
  }

  get (key) {
    return this.map.get(key)
  }

  destory () {
    for (let value of this.map.values()) {
      value = null
    }
  }
}