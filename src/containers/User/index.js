import React, { Component } from 'react';
import { getUsers } from '../../actions/userActions';
import { withAccount } from '../../components/context/AccountContext';
import { Table, Avatar } from 'antd';
import styles from './styles.less';
import { translate } from 'react-i18next';
import { capitalizeFirstLetter, formatSortTable } from '../../helpers/utility';
import { formatTime } from '../../helpers/time';
//import classNamesBind from 'classnames/bind';
import ListsHeader from './components/ListsHeader';

//let cx = classNamesBind.bind(styles);

const columns = (t) => {
	return [
		{
			dataIndex: 'avatar_url',
			key: 'avatar_url',
			render: (avatar) => {
				return <Avatar size="large" src={avatar} />;
			}
		},
		{
			title: capitalizeFirstLetter(t('website.homepage.section5.signup_fullname')),
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: capitalizeFirstLetter(t('website.homepage.section5.signup_email')),
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: capitalizeFirstLetter(t('manage.user.table_user.phone')),
			dataIndex: 'phone',
			key: 'phone'
		},
		{
			title: capitalizeFirstLetter(t('manage.log.table.header_column_time')),
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: true
		},
		{
			title: capitalizeFirstLetter(t('manage.dashboard.card_post.title')),
			dataIndex: 'posts_count',
			key: 'posts_count'
		},
		{
			title: capitalizeFirstLetter(t('manage.user.table_user.upvotes')),
			dataIndex: 'votes_count',
			key: 'votes_count'
		},
		{
			title: capitalizeFirstLetter(t('social.profile.info.comment')),
			dataIndex: 'comments_count',
			key: 'comments_count'
		}
	];
};

class UsersContainer extends Component {
	constructor(props, context) {
		super(props, context);
		this.setData = this.setState.bind(this);
	}

	state = {
		isLoading: true,
		data: [],
		pagination: null,
		comments_count: 0,
		posts_count: 0,
		users_count: 0
	};

	componentDidMount() {
		getUsers(this.setData);
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = {
			...this.state.pagination
		};
		pager.current = pagination.current;
		this.setState({
			pagination: pager
		});
		getUsers(this.setData, {
			page: pagination.current,
			sortCreatedAt: formatSortTable(sorter, 'created_at'),
			...filters
		});
	};

	render() {
		const { data, isLoading, pagination, comments_count, posts_count, users_count } = this.state;
		const { t } = this.props;
		const dataSource = data
			? data.map((user) => {
					return {
						avatar_url: user.avatar_url,
						name: user.name,
						email: user.email,
						phone: user.phone,
						created_at: formatTime(user.created_at),
						posts_count: user.posts_count,
						votes_count: user.votes_count,
						comments_count: user.comments_count
					};
				})
			: [];

		return (
			<div>
				<ListsHeader users_count={users_count} posts_count={posts_count} comments_count={comments_count} />
				<div className={styles['table-log']}>
					<Table
						dataSource={dataSource}
						columns={columns(t)}
						rowKey={(record, index) => index}
						loading={isLoading}
						pagination={pagination}
						onChange={this.handleTableChange}
						//scroll={{ y: "60vh" }}
					/>
				</div>
			</div>
		);
	}
}

export default translate((props) => props.namespaces)(withAccount(UsersContainer));
