import React, { Component } from 'react';
import { getUsers } from '../../actions/userActions';
//import { parseLog } from "../../helpers/parse";
import { withAccount } from '../../components/context/AccountContext';
import { Table } from 'antd';
import styles from './styles.less';
import { translate } from 'react-i18next';
import { capitalizeFirstLetter, formatSortTable } from '../../helpers/utility';
//import { formatTime } from "../../helpers/time";

const columns = (t) => {
	return [
		{
			dataIndex: 'avatar_url',
			key: 'avatar_url',
			render: (avatar) => {
				return (
					<img
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							verticalAlign: 'middle',
							background: 'url(' + avatar + ') center center / cover',
							display: 'inline-block',
							float: 'right',
							marginLeft: '3px'
						}}
						data-toggle="tooltip"
						title=""
						type="button"
						rel="tooltip"
						data-original-title=""
					/>
				);
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
		pagination: null
	};

	componentDidMount() {
		getUsers(this.setData);
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
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
		const { data, isLoading, pagination } = this.state;
		const { t } = this.props;

		const dataSource = data
			? data.map((user) => {
					return {
						avatar_url: user.avatar_url,
						name: user.name,
						email: user.email,
						phone: user.phone,
						created_at: user.created_at
					};
				})
			: [];

		return (
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
		);
	}
}

export default translate((props) => props.namespaces)(withAccount(UsersContainer));
