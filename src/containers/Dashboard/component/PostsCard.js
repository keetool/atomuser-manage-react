import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Card, } from "antd";
import { Chart, Axis, Geom, } from "bizcharts";
import styles from '../styles.less';
import { chartScale, dateFormater, mainColor, cardTooltip } from './Common';
import { getDashboard } from "../../../actions/dashboardActions";
import  CardTitle  from "../component/CardTitle";

class SmallPostCard extends Component {
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
        getDashboard(this.setData, 'posts-by-date');
    }

    changeDate = (dateString) => {
    
        getDashboard(this.setData,'posts-by-date',{
          start_time: dateString[0],
          end_time: dateString[1],
        });
    
    }

    render() {
        let { t } = this.props;
        let { isLoading, data,total } = this.state;
        // console.log(data);
        return (

            <Card
                loading={isLoading}
                title={
                    <CardTitle
                        title={t("manage.dashboard.card_post.title")}
                        value={total}
                        icon="book"
                        isLoading={isLoading}
                        changeDate={this.changeDate}
                    />
                }
                className={styles['card-lite']}
            >
                <Chart
                    
                    scale={chartScale}
                    height={200} 
                    data={data} 
                    forceFit
                    className={styles['charts']}
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