import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, } from "antd";
import { Chart, Axis, Geom, } from "bizcharts";
import { chartScale, dateFormater, mainColor, cardTooltip } from './Common'

export default class LargeUserCard extends Component {

    render() {
        let { t, data } = this.props;
        return (

            <Card
                title={t("manage.dashboard.card_new_user.title")}
            >
                <Chart
                    data={data}
                    scale={chartScale}
                    forceFit
                    height={350}
                    style={{ overflow: 'hidden' }}
                >
                    <Axis name="date" label={{ formatter: dateFormater }} />
                    <Axis name="count" label={{ formatter: val => `${val}` }} />
                    {cardTooltip(t("manage.dashboard.card_new_user.title"))}
                    <Geom shape="area" type="interval" position="date*count" size={20} color={mainColor} />
                </Chart>
            </Card>

        );
    }
}


LargeUserCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    className: PropTypes.string,
};
