import React, { Component } from 'react'
import styles from './index.module.scss'
import rank from '../../imgs/rank.png'
import jq from '../../imgs/jq.jpg'

export default class IndexRank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketList: []
        }
    }

    componentDidMount() {
        let data = {
            page: 0,
            pageSize: 3,
            providerType: this.props.type,
        };
        this.$config.post(
            data,
            "ProviderListRequestBody",
            "/provider/queryProviderList",
            (res, isSucced) => {
                if (isSucced) {
                    this.setState({ ticketList: res.providers })
                }
            }
        );
    }

    // componentWillUnmount() {
    //     PubSub.unsubscribe(this.token)
    // }

    render() {
        const {ticketList} = this.state
        const {title} = this.props
        return (
            <div>
                <div className={styles.rank_wrap}>
                    <div className={styles.rank_wrap_title}>
                        <i className={styles.rank_icon}><img src={rank} alt="" /></i>
                        <span className={styles.rank_title_ph}>{title}</span>
                    </div>

                    {
                        ticketList.map((res, index) => {
                            return <div key={res.providerId}>
                                <div className={styles.product_info}
                                >
                                    <img src={res.providerPictureUrls ? res.providerPictureUrls[0] : jq} />
                                    <div className={styles.product_name}>
                                        <div className={styles.product_name_ph}>TOP.<b>{index + 1}</b></div>
                                        <div className={`${styles.van_ellipsis} ${styles.product_ph}`}>{res.providerName}</div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}
