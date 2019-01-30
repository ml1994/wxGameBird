/*
 * @Description: 背景
 * @Author: ma.cq
 * @Date: 2019-01-28 10:52:02
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-28 16:19:51
 */
import { Sprite } from '../base/Sprite'

export class Background extends Sprite {
  constructor () {
    const image = Sprite.getImage('background')
    super(
      image,
      0, 0,
      image.width, image.height,
      0, 0,
      window.innerWidth, window.innerHeight
    )
  }
}