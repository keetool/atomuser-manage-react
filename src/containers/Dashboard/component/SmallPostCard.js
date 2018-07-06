import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, } from "antd";
import { Chart, Axis, Geom, } from "bizcharts";
import styles from '../styles.less';
import { chartScale, dateFormater, mainColor, cardTitle, cardTooltip } from './Common'

export default class SmallPostCard extends Component {

    render() {
        let { t, isLoading, data } = this.props;
        return (

            <Card
                title={cardTitle(
                    t("manage.dashboard.card_post.title"),
                    '3,141',
                    'book',
                    isLoading
                )}
                className={styles['card-lite']}
            >
                <Chart
                    scale={chartScale}
                    height={200} data={data} style={{ marginLeft: -60, overflow: 'hidden' }}
                    forceFit
                >
                    <Axis name="date" label={{ formatter: dateFormater }} />
                    <Axis name="count" label={{ formatter: () => `` }} />
                    {cardTooltip(t("manage.dashboard.card_post.title"))}
                    <Geom
                        type="line"
                        opacity={0.8}
                        shape={'circle'}
                        position="date*count"
                        size={2}
                        color={mainColor}

                    />
                </Chart>
            </Card>

        );
    }
}


SmallPostCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    className: PropTypes.string,

};