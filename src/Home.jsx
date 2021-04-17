import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Nav } from './components'
import { Index, Shop, Goods } from './containers'

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* 注册路由 */}
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/shop" component={Shop} />
                    <Route exact path="/goods" component={Goods} />
                    <Redirect to="/" />
                </Switch>
                <Nav />
            </div>
        )
    }
}
