import React, { Component } from 'react'
import Mylink from './NavLink/index.jsx'
import styles from './index.module.scss'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <div className={styles.root}>
                    <Mylink
                        pathUrl="/"
                        icoName={"i-index"}
                        active={"navOne"}
                        linkName="首页"
                        exact
                    />
                    <Mylink
                        pathUrl="/shop"
                        icoName="i-shop"
                        active={"navTwo"}
                        linkName="商家"
                    />
                    <Mylink
                        pathUrl="/goods"
                        icoName="i-goods"
                        active={"navThree"}
                        linkName="商品"
                    />
                    <Mylink
                        pathUrl="/my"
                        icoName="i-my"
                        active={"navFour"}
                        linkName="我的"
                    />
                </div>
            </div>
        )
    }
}
