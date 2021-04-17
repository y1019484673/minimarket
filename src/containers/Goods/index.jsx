import React, { Component } from 'react'
import { Swipe } from "../../components"
import { SearchBar, Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import PubSub from 'pubsub-js'
import styles from './index.module.scss'

const data = [
    {
        value: '1',
        label: 'Food',
    }, {
        value: '2',
        label: 'Supermarket',
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
    },
];

export default class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swipeList: [
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexThird.jpg' },
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexSecond.jpg' },
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexFirst.jpg' }
            ],
            initData: ''
        };
    }

    onChange = (value) => {
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }

    componentDidMount() {
        this.$config.post({}, "", "/index/listSlideShow", (res, isSucced) => {
            if (isSucced) {
                PubSub.publish('swiper_img', { data: res })
            }
        })
    }

    render() {
        const settings = {
            autoplay: true,
            autoplayInterval: 3000,
            infinite: true,
            dots: true
        }
        const { swipeList, initData } = this.state
        return (
            <div>
                <div className={styles.fixation}>
                    {/* 搜索栏和轮播图 Start */}
                    {
                        swipeList &&
                        <Swipe data={swipeList} {...settings} />
                    }
                    <SearchBar placeholder="输入景区或产品名搜索" />
                    {/* 搜索栏和轮播图 End */}

                    {/* 商品导航 Start */}
                    <div className={styles.goods_all}>
                        <div className={styles.goods_left}>
                            <Menu
                                className={styles.single_foo_menu}
                                data={data}
                                value={['1']}
                                level={1}
                                onChange={this.onChange}
                                height={document.documentElement.clientHeight * 0.6}
                            />
                        </div>
                    </div>
                    {/* 商品导航 End */}
                </div>
            </div>
        )
    }
}
