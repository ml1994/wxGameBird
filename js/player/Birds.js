
/*
* @Description: 小鸟
* @Author: ma.cq
* @Date: 2019-01-28 10:49:30
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:03:12
*/
import { Sprite } from '../base/Sprite'
import { DataStore } from '../base/DataStore'

export class Birds extends Sprite {
  constructor () {
    const image = Sprite.getImage('birds')
    super(
      image,
      0, 0,
      image.width, image.height,
      0, 0,
      image.width, image.height
    )
    // 小鸟宽34，高24，左右边距9，上下边距10
    this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18]
    this.clippingY = [10, 10, 10]
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]

    const birdX = DataStore.getInstance().canvas.width / 4
    this.birdsX = [birdX, birdX, birdX]
    const birdY = DataStore.getInstance().canvas.height / 2
    this.birdsY = [birdY, birdY, birdY]
    const birdWidth = 34
    this.birdsWidth = [birdWidth, birdWidth, birdWidth]
    const birdHeight = 24
    this.birdsHeight = [birdHeight, birdHeight, birdHeight]
    this.index = 0
    this.count = 0
    this.time = 0
    // birdsY数组内值会随自由落体变化，此y记录原始值。
    // 点击弹跳原理，每次点击将上一个变化过得birdsY数组的值赋给y做初始值
    this.y = [birdY, birdY, birdY]
  }

  draw () {
    // 切换小鸟状态，speed小数加上Math.floor功能类似减速器
    const speed = 0.2
    this.count += speed
    if (this.index >= 2) {
      this.count = 0
    }
    this.index = Math.floor(this.count)

    // 小鸟自由落体
    const g = 0.98 / 2.4
    // 模拟开局的一次弹跳
    const offsetUp = 30
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2
    for (let i = 0; i < this.birdsY.length; i++) {
      this.birdsY[i] = this.y[i] + offsetY
    }
    this.time++
    
    super.draw(
      this.img,
      this.clippingX[this.index], this.clippingY[this.index],
      this.clippingWidth[this.index], this.clippingHeight[this.index],
      this.birdsX[this.index], this.birdsY[this.index],
      this.birdsWidth[this.index], this.birdsHeight[this.index]
    )
  }
}