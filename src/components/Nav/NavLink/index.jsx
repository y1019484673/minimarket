import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.scss'

export default class NavLink extends Component {
  
  render() {
    const { pathUrl, icoName, linkName, ...rest } = this.props;
    return (
    <Link
      {...rest}
      to={pathUrl}
      // activeClassName={active}
      className={styles.root}
    >
    <i className={icoName + ' ' + styles.ico} />
    <span className={styles.text}>{linkName}</span>
    </Link>
    )
  }
}