import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Card,  } from "antd";
import { Chart, Axis, Geom, } from "bizcharts";
import styles from '../styles.less';
import { chartScale, dateFormater, mainColor,  cardTooltip } from './Common';
import { getDashboard } from "../../../actions/dashboardActions";
import  CardTitle  from "../component/CardTitle";
class UserCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.setData = this.setState.bind(this);
    }

    state = {
        isLoading: false,
        data: [],
        total: 0,
    }

    componentDidMount() {
        getDashboard(this.setData, 'users-by-date');
    }

    changeDate = (dateString) => {
        getDashboard(this.setData, 'users-by-date', {
            start_time: dateString[0],
            end_time: dateString[1],
        });

    }

    render() {
        let { t } = this.props;
        let { isLoading, data, total } = this.state;
        // console.log(data);
        return (

            <Card
                loading={isLoading}
                title={
                    <CardTitle
                        title={t("manage.dashboard.card_user.title")}
                        value={total}
                        icon="user"
                        isLoading={isLoading}
                        changeDate={this.changeDate}
                    />
                }
                className={styles['card-lite']}

            >
                <Chart
                    scale={chartScale}
                    height={200} data={data}
                    className={styles['charts']}
                    forceFit
                >
                    <Axis name="date" label={{ formatter: dateFormater }} />
                    <Axis name="count" label={{ formatter: (val, id) => { return id % 2 == 0 ? val : ''; } }} />
                    {cardTooltip(t("manage.dashboard.card_user.title"))}
                    <Geom
                        type="line"
                        opacity={0.8}
                        shape="smooth"
                        position="date*count"
                        size={2}
                        color={mainColor} />

                </Chart>

            </Card>

        );
    }
}


UserCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    className: PropTypes.string,

};

export default translate(props => props.namespaces)(UserCard);