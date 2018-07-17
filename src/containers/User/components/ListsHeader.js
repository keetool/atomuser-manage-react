import React, { Component } from 'react';
import { Layout, Col, Row } from 'antd';
import styles from '../styles.less';
import { translate } from 'react-i18next';
import { capitalizeFirstLetter } from '../../../helpers/utility';
import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';

let cx = classNamesBind.bind(styles);

class ListsHeader extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const { t, comments_count, posts_count, users_count } = this.props;
		const { Header } = Layout;

		return (
			<Header
				className={cx({
					'layout-header': true
				})}
			>
				<Row type="flex" justify="start" style={{ height: '100px' }}>
					<Col span={1} />
					<Col span={11}>
						<h2>
							<b>{capitalizeFirstLetter(t('manage.user.table_user.statistic'))}</b>
						</h2>
						<p
							className={cx({
								parameter: true
							})}
						>
							{capitalizeFirstLetter(t('manage.user.table_user.parameter'))}
						</p>
					</Col>
					<Col span={4}>
						<p>{capitalizeFirstLetter(t('manage.dashboard.card_user.title'))}</p>
						<h2
							className={cx({
								parameter: true
							})}
						>
							{users_count}
						</h2>
					</Col>
					<Col span={4}>
						<p>{capitalizeFirstLetter(t('manage.dashboard.card_post.title'))}</p>
						<h2
							className={cx({
								parameter: true
							})}
						>
							{posts_count}
						</h2>
					</Col>
					<Col span={4}>
						<p>{capitalizeFirstLetter(t('social.profile.info.comment'))}</p>
						<h2
							className={cx({
								parameter: true
							})}
						>
							{comments_count}
						</h2>
					</Col>
				</Row>
			</Header>
		);
	}
}

ListsHeader.propTypes = {
	users_count: PropTypes.number,
	comments_count: PropTypes.number,
	posts_count: PropTypes.number
};

export default translate((props) => props.namespaces)(ListsHeader);
