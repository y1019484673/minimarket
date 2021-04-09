import React, { Component } from 'react'
import axios from 'axios'

//引入首页组件
import Home from './Home';

export default class App extends Component {
	render() {
		return (
			<div>
				<Home></Home>
			</div>
		)
	}
}
