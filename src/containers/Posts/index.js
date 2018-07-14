import React, { Component } from "react";
import { getPosts, hidePost } from "../../actions/postsActions";
// import { parseLog } from "../../helpers/parse";
import { withAccount } from "../../components/context/AccountContext";
import { Table, Tooltip, Avatar, Icon, Divider, Modal } from "antd";
import styles from "./styles.less";
import { translate } from "react-i18next";
import { shortString, capitalizeFirstLetter, formatSortTable } from "../../helpers/utility";
import { formatTime } from "../../helpers/time";
import { BASE_URL } from "../../constants/env";

const columns = t => {
  return [
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.creator")),
      dataIndex: "creator",
      key: "creator",
      width: "25%",
      render: (obj, row, index) => {
        const comp = (<div key={index}><Avatar src={obj.avatar_url} />
          {'\u00A0\u00A0'}
          <a href="#" >{obj.name}</a>
        </div>);
        return comp;
      }
    },
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.body")),
      dataIndex: "body",
      key: "body",
      render: (text, row, index) => {
        const comp=(
          <div
            key={index}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: `${t(text)}` }}
          />
        );
        return comp;
      },
      width: "20%"
    },
    {
      title: '',
      dataIndex: 'info',
      key: 'info',
      render: (obj) => {
        const comp = (<span>
          <Tooltip title={obj.upvote + " " + capitalizeFirstLetter(t("social.home.post_item.upvote"))}>
            <Icon type="caret-up" /> {obj.upvote}</Tooltip>
          <Divider type="vertical" />
          <Tooltip title={obj.downvote + " " + capitalizeFirstLetter(t("social.home.post_item.downvote"))}>
            <Icon type="caret-down" /> {obj.downvote}</Tooltip>
          <Divider type="vertical" />
          <Tooltip title={obj.comment + " " + capitalizeFirstLetter(t("social.home.post_item.comment"))}>
            <Icon type="message" /> {obj.comment}</Tooltip>
        </span>);
        return comp;
      }
    },
    {
      title: capitalizeFirstLetter(t("manage.post.table.header.created_at")),
      dataIndex: "created_at",
      key: "created_at",
      // sorter: true
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (obj) => {
        const comp = (
        <span>
          <Tooltip title={t("manage.post.table.action.hide")}>
            <Icon className={styles["table-action-icon"]} type="close-circle" onClick={() => obj.confirmHidePost(obj.post_id)} />
          </Tooltip>
          <Tooltip title={t("manage.post.table.action.detail")}>
            <a href={BASE_URL + '/post/' + obj.post_id} target="_blank" rel="noopener noreferrer">
              <Icon className={styles["table-action-icon"]} type="info-circle" />
            </a>
          </Tooltip>
        </span>);
        return comp;
    }
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

  confirmHidePost = (post_id) => {
    let { t } = this.props;
    Modal.confirm({
      title: t('manage.post.confirm.hide_post'),
      content: t('manage.post.confirm.description'),
      okType: 'danger',
      onOk: () => {
        hidePost(this.setData, () => getPosts(this.setData), post_id);
      },
    });
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

          creator: obj.creator,
          info: {
            comment: obj.num_comments,
            upvote: obj.upvote,
            downvote: obj.downvote,
          },
          actions: {
            post_id: obj.id,
            confirmHidePost: this.confirmHidePost
          },
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
