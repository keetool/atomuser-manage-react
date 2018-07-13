import React, { Component } from "react";
import { getPosts } from "../../actions/postsActions";
// import { parseLog } from "../../helpers/parse";
import { withAccount } from "../../components/context/AccountContext";
import { Table, Divider } from "antd";
import styles from "./styles.less";
import { translate } from "react-i18next";
import { shortString, capitalizeFirstLetter, formatSortTable } from "../../helpers/utility";
import { formatTime } from "../../helpers/time";
import { div } from "gl-matrix/src/gl-matrix/vec4";

const columns = t => {
  return [
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.creator")),
      dataIndex: "creator_name",
      key: "creator_name",
      width: "30%",
      render: (text, row, index) => {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: text
            }}
          />
        );
      }
    },
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.body")),
      dataIndex: "body",
      key: "body",
      render: text => `${capitalizeFirstLetter(t(text))}`,
      width: "30%"
    },

    {
      title: capitalizeFirstLetter(t("manage.post.table.header.created_at")),
      dataIndex: "created_at",
      key: "created_at",
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <span>
          <a href="javascript:;">Ẩn</a>
          <Divider type="vertical" />
          <a href="javascript:;">Xoá</a>
          <Divider type="vertical" />
          <a href="javascript:;">Chi tiết</a>
        </span>
      )
    },
  ];
};

class PostsContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.setData = this.setState.bind(this);
  }

  state = {
    isLoading: true,
    data: [],
    pagination: null
  };

  componentDidMount() {
    getPosts(this.setData);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    getPosts(this.setData, {
      page: pagination.current,
      sortCreatedAt: formatSortTable(sorter, "created_at"),
      ...filters
    });
  };

  render() {
    const { data, isLoading, pagination } = this.state;
    const { t } = this.props;

    const dataSource = data
      ? data.map(obj => {
        return {
          creator_name: obj.creator.name,
          body: shortString(obj.body, 20),
          created_at: formatTime(obj.created_at)
        };
      })
      : [];

    return (
      <div className={styles["table-log"]}>
        <Table
          dataSource={dataSource}
          columns={columns(t)}
          rowKey={(record, index) => index}
          loading={isLoading}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default translate(props => props.namespaces)(withAccount(PostsContainer));
