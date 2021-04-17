import React, { Component } from 'react'
import { Swipe, IndexRank } from "../../components"
import PubSub from 'pubsub-js'
import styles from './index.module.scss'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swipeList: [
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexThird.jpg' },
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexSecond.jpg' },
                { redirectUrl: '', pictureUrl: 'http://fbtestw.ectrip.com/styles/system/default/images/mobileIndexFirst.jpg' }
            ],
            ticketList: []
        };
    }

    componentDidMount(){
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

        const { swipeList, ticketList } = this.state

        return (
            <div>
                {
                    swipeList &&
                    <Swipe data={swipeList} {...settings} />
                }
                <div className={styles.all_wrap}>
                    {/* 景区排行 Start */}
                    <IndexRank title="景区排行" type="01"></IndexRank>
                    {/* 景区排行 End */}

                    {/* 酒店排行 Start */}
                    <IndexRank title="酒店排行" type="06"></IndexRank>
                    {/* 酒店排行 End */}

                    {/* 餐饮排行 Start */}
                    <IndexRank title="餐饮排行" type="13"></IndexRank>
                    {/* 餐饮排行 End */}
                </div>
            </div>
        )
    }
}
