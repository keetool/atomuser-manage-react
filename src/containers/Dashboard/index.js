import React from "react";
import { translate } from "react-i18next";
import { Row, Col,  } from "antd";
//---import actions---
import { getDashboard } from "../../actions/dashboardActions";
//---import child components---
import SmallUserCard from './component/UsersCard';
import SmallPostCard from './component/SmallPostCard';
// import LargeUserCard from './component/LargeUserCard';


class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setData = this.setState.bind(this);
  }

  // state = {
  //   isLoading: false,
  //   data: [],
  // }

  componentDidMount() {
    getDashboard(this.setData,'users-by-date');
  }
  //filter by date
  changeDate = (date, dateString) => {
    let filter = { ...this.state.filter };
    filter.start_time = dateString[0];
    filter.end_time = dateString[1];
    this.setState({ filter: filter });

    getDashboard(this.setData,'users-by-date', {
      start_time: date[0] ? date[0].format('Y-M-D') : '',
      end_time: date[1] ? date[1].format('Y-M-D') : '',
    });

  }

  render() {
    // const { t } = this.props;
    // let data = this.state.data.new_user_id_by_date;
    // let { isLoading } = this.state;

    return (<div>
      <div>
        {/* filter */}
        {/* <Row>
          <DatePicker.RangePicker
            onChange={this.changeDate}
            format="D-M-Y"
          />
        </Row> */}
        <br />
        {/* end filter */}
        
        <Row>
          <Col lg={16} md={16} sm={12}>
            <SmallUserCard/>
            {/* <br/> */}
          </Col>

          <Col lg={8} md={8} sm={12}>
            <SmallPostCard/>
          </Col>

        </Row>
        <br />
      </div>
    </div>);
  }
}

DashboardContainer.propTypes = {};

export default translate(props => props.namespaces)(DashboardContainer);
