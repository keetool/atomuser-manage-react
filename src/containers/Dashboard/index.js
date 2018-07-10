import React from "react";
import { translate } from "react-i18next";
import { Row, Col, } from "antd";
//---import actions---
// import { getDashboard } from "../../actions/dashboardActions";
//---import child components---
import SmallUserCard from './component/UsersCard';
import SmallPostCard from './component/PostsCard';
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
    // getDashboard(this.setData,'users-by-date');
  }
  //filter by date
  // changeDate = (date, dateString) => {
  //   let filter = { ...this.state.filter };
  //   filter.start_time = dateString[0];
  //   filter.end_time = dateString[1];
  //   this.setState({ filter: filter });

  //   getDashboard(this.setData,'users-by-date', {
  //     start_time: date[0] ? date[0].format('Y-M-D') : '',
  //     end_time: date[1] ? date[1].format('Y-M-D') : '',
  //   });

  // }

  render() {
    // const { t } = this.props;
    // let data = this.state.data.new_user_id_by_date;
    // let { isLoading } = this.state;

    return (<div>
      <Row>
        <Col xl={16} lg={14} md={14} sm={24}>
          <SmallUserCard />
        </Col>
        <Col xl={8} lg={10} md={10} sm={24}>
          <SmallPostCard />
        </Col>
      </Row>
    </div>);
  }
}

DashboardContainer.propTypes = {};

export default translate(props => props.namespaces)(DashboardContainer);
