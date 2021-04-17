import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

export default class MyLink extends Component {
  
  render() {
    const { pathUrl, icoName, linkName,active, ...rest } = this.props;
    return (
    <NavLink
      {...rest}
      to={pathUrl}
      activeClassName={styles[active]}
      className={styles.root}
    >
    <i className={styles[icoName] + ' ' + styles.ico} />
    <span className={styles.text}>{linkName}</span>
    </NavLink>
    )
  }
}