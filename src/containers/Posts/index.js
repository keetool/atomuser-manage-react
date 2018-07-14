import React, { Component } from "react";
import { getPosts } from "../../actions/postsActions";
// import { parseLog } from "../../helpers/parse";
import { withAccount } from "../../components/context/AccountContext";
import { Table, Tooltip, Button,Avatar,  } from "antd";
import styles from "./styles.less";
import { translate } from "react-i18next";
import { shortString, capitalizeFirstLetter, formatSortTable } from "../../helpers/utility";
import { formatTime } from "../../helpers/time";


const columns = t => {
  return [
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.creator")),
      dataIndex: "creator",
      key: "creator",
      width: "15%",
      render: (obj, row, index) => {
        //console.log(obj, row, index);
        return (
          <div key={index}><Avatar  src={obj.avatar_url} />   {obj.name}</div>
        );
      }
    },
  
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.body")),
      dataIndex: "body",
      key: "body",
      render: text => `${capitalizeFirstLetter(t(text))}`,
      width: "20%"
    },
    {
      title: "Comments",
      dataIndex: "comment",
      key: "comment",
      render: text => text,
    },
    {
      title: "Up vote",
      dataIndex: "upvote",
      key: "upvote",
      render: text => text,
    },
    {
      title: "Down vote",
      dataIndex: "downvote",
      key: "downvote",
      render: text => text,
    },
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.created_at")),
      dataIndex: "created_at",
      key: "created_at",
      sorter: true
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => (
        <span>
          <Button.Group>
            <Tooltip title={t("manage.post.table.action.hide")}><Button icon="close-circle-o" /></Tooltip>
            <Tooltip title={t("manage.post.table.action.detail")}><Button icon="info-circle-o" /></Tooltip>
          </Button.Group>

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
          creator: obj.creator,
          comment: obj.num_comments,
          upvote: obj.upvote,
          downvote: obj.downvote,
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
