/*
 * @Description: 铅笔类
 * @Author: ma.cq
 * @Date: 2019-01-29 15:13:37
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 16:59:49
 */
import { Sprite } from '../base/Sprite'

export class Pencil extends Sprite {
  constructor (image, top) {
    super(
      image,
      0, 0,
      image.width, image.height,
      window.innerWidth, 0,
      image.width, image.height
    )
    this.top = top
    this.moveSpeed = 2
  }

  draw () {
    this.x -= this.moveSpeed
    super.draw(
      this.img,
      0, 0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )
  }
}