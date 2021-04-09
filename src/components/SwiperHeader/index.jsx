import React, { Component } from 'react'

// 引入 Swiper core 和必须的组件
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// 引入 Swiper 样式
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './index.css'
// 安装 Swiper 组件
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default class SwiperHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            swiperData:[]
        };
        this.$config.post({},"","/index/listSlideShow",(res,isSucced) => {
            if(isSucced){
                this.setState({swiperData,res})
            }else{
                
            }
        })
    }

    render() {
        return (
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                initialSlide={1} // 初始化显示哪一个
                loop={true} // 是否循环
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                threshold={40}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        )
    }
}
