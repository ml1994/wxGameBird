/*
 * @Description: 陆地
 * @Author: ma.cq
 * @Date: 2019-01-28 10:52:10
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 16:36:22
 */
import { Sprite } from '../base/Sprite'
import { Director } from '../Director'

export class Land extends Sprite{
  constructor () {
    const image = Sprite.getImage('land')
    super(
      image,
      0, 0,
      image.width, image.height,
      0, window.innerHeight - image.height,
      image.width, image.height
    )
    // 地板x坐标
    this.landX = 0
    // 地板移动速度
    this.landSpeed = Director.getInstance().moveSpeed
  }

  draw () {
    this.landX += this.landSpeed
    if (this.landX >= this.width - window.innerWidth) {
      this.landX = 0
    }
    super.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height
    )
  }
}