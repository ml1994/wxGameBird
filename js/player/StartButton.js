/*
 * @Description: 开始按钮
 * @Author: ma.cq
 * @Date: 2019-01-28 10:50:38
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 16:23:56
 */
import { Sprite } from '../base/Sprite'

export class StartButton extends Sprite {
  constructor () {
    const image = Sprite.getImage('startButton')
    super(
      image,
      0, 0,
      image.width, image.height,
      (window.innerWidth - image.width) / 2, (window.innerHeight - image.height) / 2,
      image.width, image.height
    )
  }
}