import React from "react";
import { translate } from "react-i18next";
import { Row, Col, DatePicker } from "antd";
//---import actions---
import { getDashboard } from "../../actions/dashboardActions";
//---import child components---
import SmallUserCard from './component/SmallUserCard';
import SmallPostCard from './component/SmallPostCard';
import LargeUserCard from './component/LargeUserCard';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

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

  setData = this.setState.bind(this);

  changeDate = (date, dateString) => {
    let filter = { ...this.state.filter };
    filter.start_time = dateString[0];
    filter.end_time = dateString[1];
    this.setState({ filter: filter });

    getDashboard(this.setData, {
      start_time: date[0] ? date[0].format('Y-M-D') : '',
      end_time: date[1] ? date[1].format('Y-M-D') : '',
    });

  }

  render() {
    const { t } = this.props;
    //let { end_time, start_time } = this.state.filter;
    let data = this.state.data.new_user_id_by_date;
    let { isLoading } = this.state;

    return (<div>
      <div>
        <Row>
          <DatePicker.RangePicker
            onChange={this.changeDate}
            format="D-M-Y"
          />
        </Row>
        <br />
        <Row gutter={24}>
          <Col span={6}>
            <SmallUserCard t={t} isLoading={isLoading} data={data} />
          </Col>

          <Col span={6}>
            <SmallPostCard t={t} isLoading={isLoading} data={data} />
          </Col>

        </Row>
        <br />
        <Row gutter={24}>
          <Col span={24}>
            <LargeUserCard t={t} isLoading={isLoading} data={data} />
          </Col>
        </Row>
      </div>
    </div>);
  }
}

DashboardContainer.propTypes = {};

export default translate(props => props.namespaces)(DashboardContainer);
