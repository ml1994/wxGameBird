/*
 * @Description: 资源文件加载器，确保canvas图片在图片资源加载完成后再进行渲染
 * @Author: ma.cq
 * @Date: 2019-01-28 10:43:12
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-28 15:11:52
 */
import { Resources } from './Resources'

export class ResourceLoader {
  static create () {
    return new ResourceLoader()
  }

  constructor () {
    this.map = new Map(Resources)
    for (let [key, value] of this.map) {
      const image = wx.createImage()
      image.src = value
      this.map.set(key, image)
    }
  }

  onLoaded (cb) {
    let loadedCount = 0
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          cb(this.map)
        }
      }
    }
  }
}