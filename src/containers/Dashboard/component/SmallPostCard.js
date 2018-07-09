import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Card, } from "antd";
import { Chart, Axis, Geom, } from "bizcharts";
import styles from '../styles.less';
import { chartScale, dateFormater, mainColor, CardTitle, cardTooltip } from './Common';
import { getDashboard } from "../../../actions/dashboardActions";

class SmallPostCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    state = {
        isLoading: false,
        data: [],
    }

    componentDidMount() {
        getDashboard(this.setData, 'posts-by-date', 'posts_by_date');
    }

    render() {
        let { t } = this.props;
        let { isLoading, data } = this.state;
        // console.log(data);
        return (

            <Card
                title={

                    <CardTitle
                        title={t("manage.dashboard.card_post.title")}
                        value={'3,141'}
                        icon='book'
                        isLoading={isLoading}
                    // changeDate={this.changeDate}
                    />
                }
                className={styles['card-lite']}
            >
                <Chart
                    scale={chartScale}
                    height={200} data={data.slice(0, 7)} style={{ marginLeft: -60, overflow: 'hidden' }}
                    forceFit
                >
                    <Axis name="date" label={{ formatter: dateFormater }} />
                    <Axis name="count" label={{ formatter: () => `` }} />
                    {cardTooltip(t("manage.dashboard.card_post.title"))}
                    <Geom
                        shape="area" type="interval"
                        opacity={0.8}
                        position="date*count"
                        size={15}
                        color={mainColor}

                    />
                    {/* <Geom shape="area" type="interval" position="date*count" size={20} color={mainColor} /> */}
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

export default translate(props => props.namespaces)(SmallPostCard);