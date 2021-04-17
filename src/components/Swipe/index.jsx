import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import PubSub from 'pubsub-js'
import styles from './index.module.scss'

export default class Swipe extends React.Component {
  state = {
    data: this.props.data,
    imgHeight: 250,
  }
  componentDidMount() {
    this.token = PubSub.subscribe('swiper_img', (_, stateObj) => {
      setTimeout(() => {
        this.setState({
          data: stateObj.data,
        });
      }, 100);
    })
  }

  componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}

  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay
          infinite
          className={styles.carousel_style}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`${val.pictureUrl}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                className={styles['swiper-img']}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}