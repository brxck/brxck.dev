import React from 'react'
import style from '../styles/cardGrid.module.scss'

const CardGrid = props => <div className={style.flex}>{props.children}</div>

export default CardGrid
