import React from "react";
import { translate } from "react-i18next";
import CustomCard from "../../components/common/Card";
import { Row, Col, Icon, DatePicker, } from "antd";
import { Chart, Axis, Tooltip, Geom, } from "bizcharts";
import styles from './styles.less';
import { getDashboard } from "../../actions/dashboardActions";
import moment from 'moment';

const dateFormater = (val) => {
  let res = moment(val).format('D/M');
  return res;
};
const chartScale = {
  date: {
    type: "cat",
    range: [0, 1]
  },
};
const mainColor = '#1890ff';
const cardTitle = (title, value, icon, isLoading) => {
  return (
    <div>
      {isLoading ? <Icon type="loading" /> : <Icon type={icon} />} {title}
      <b style={{ float: 'right' }}>{value}</b>
    </div>);
}
const cardTooltip = (title) => {
  return (
    <Tooltip
      containerTpl='<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>'
      itemTpl={'<tr class="g2-tooltip-list-item"><td style="color:{color}">' + title + ': </td><td>{value}</td></tr>'}
    />
  );
}
class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    //this.setData = this.setState.bind(this);
  }
  setData = this.setState.bind(this);
  state = {
    isLoading: false,
    data: [],
    filter: {
      start_time: null,
      end_time: null,
    }
  }

  componentDidMount() {
    getDashboard(this.setData);
  }

  changeDate = (date, name) => {
    let filter = { ...this.state.filter };
    filter[name] = date;
    this.setState({ filter: filter });
    let { start_time, end_time } = filter;
    if (start_time && end_time) {
      getDashboard(this.setData, {
        start_time: start_time.format('Y-M-D'),
        end_time: end_time.format('Y-M-D'),
      });
    }
  }

  render() {
    const { t } = this.props;
    let { end_time, start_time } = this.state.filter;
    let data = this.state.data.new_user_id_by_date;
    let { isLoading } = this.state;

    return (<div>
      <div>
        <Row gutter={24}>
          <Col span={3}>
            <DatePicker
              placeholder={t('dashboard.datepicker_start_time.placeholder')}
              format='D-M-Y'
              value={start_time}
              onChange={(date) => this.changeDate(date, 'start_time')}
            />
          </Col>
          <Col span={3}>
            <DatePicker
              placeholder={t('dashboard.datepicker_end_time.placeholder')}
              format='D-M-Y'
              value={end_time}
              onChange={(date) => this.changeDate(date, 'end_time')}
            />
          </Col>
        </Row>
        <br />
        <Row gutter={24}>
          <Col span={6}>
            <CustomCard
              title={cardTitle(
                t("manage.dashboard.card_user.title"),
                '8,769',
                'user',
                isLoading
              )}
              className={styles['card-lite']}
            >
              <Chart
                scale={chartScale}
                height={200} width={400} data={data} style={{ marginLeft: -60 }}>
                <Axis name="date" label={{ formatter: dateFormater }} />
                <Axis name="count" label={{ formatter: () => `` }} />
                {cardTooltip(t("manage.dashboard.card_user.title"))}
                <Geom
                  type="area"
                  opacity={0.8}
                  shape={'circle'}
                  position="date*count"
                  size={2}
                  color={mainColor} />
              </Chart>
            </CustomCard>
          </Col>

          <Col span={6}>
            <CustomCard
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
                height={200} width={400} data={data} style={{ marginLeft: -60 }}>
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
            </CustomCard>
          </Col>

        </Row>

        <br />
        <Row gutter={24}>
          <Col span={24}>
            <CustomCard
              title={t("manage.dashboard.card_new_user.title")}
            >
              <Chart
                height={400}
                width={1200}
                data={data}
                scale={chartScale}
              >
                <Axis name="date" label={{ formatter: dateFormater }} />
                <Axis name="count" label={{ formatter: val => `${val}` }} />
                {cardTooltip(t("manage.dashboard.card_new_user.title"))}
                <Geom shape="area" type="interval" position="date*count" size={20} color={mainColor} />
              </Chart>
            </CustomCard>
          </Col>

        </Row>

      </div>
    </div>);
  }
}

DashboardContainer.propTypes = {};

export default translate(props => props.namespaces)(DashboardContainer);
