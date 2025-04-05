/**
 * Logo
 * @author songmm
 */

import logo from '@/assets/logo_white.svg'
import { APP_NAME } from '@/constants/app.ts'
import { CSSProperties } from 'react'

interface IProps {
  size?: number
  radius?: number
}

function Logo(props: IProps) {
  // 默认属性
  const { size = 40, radius = 0 } = props

  // 样式
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`
  }

  return <img style={style} src={logo} alt={APP_NAME} />
}

export default Logo
