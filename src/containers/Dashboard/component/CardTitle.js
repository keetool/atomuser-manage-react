import React from "react";
import {
    DATE_MENU_VALUES,
    dateFormat,
} from './Common';
import { Icon, Dropdown, Menu, Button, DatePicker, Modal } from "antd";
import moment from "moment";
import { translate } from "react-i18next";

const DATE_MENU_ITEMS =
    DATE_MENU_VALUES.map((obj, index) => {
        return <Menu.Item key={index}>{obj.label}</Menu.Item>;
    });

// const RANGE_MENU_ITEM =
//     <Menu.Item key={31}>
//         <Dropdown key="sub" title={'Tuỳ chọn'} trigger={['click']}
//             placement="topCenter"

//             overlay={
//                 <Menu>
//                     <Menu.Item key={3}>
//                         <DatePicker.RangePicker
//                             size="small"
//                             onOpenChange={(e) => { console.log(e); }}
//                         />
//                     </Menu.Item>
//                 </Menu>
//             }>
//             <div>Tuỳ chọn<Icon type="right" /></div>
//         </Dropdown>
// </Menu.Item>
class CardTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        showModal: false,
        selectedKeys: '0',
        selectedLabel: DATE_MENU_VALUES[0].label,
        filter:{
            start_time: "",
            end_time: "",
        }
    }

    filterChange = (e) => {
        // console.log(e);
        let { key } = e;
        this.setState({
            selectedKeys: key,
            // selectedLabel: DATE_MENU_VALUES[key].label
        });
        let dateString = [];
        if (Number(key) < 3) {
            dateString = [
                moment(moment.now()).subtract(DATE_MENU_VALUES[key].days, 'days').format(dateFormat),
                moment(moment.now()).format(dateFormat),
            ];
            // console.log(dateString);
            this.setState({
                // selectedKeys: key,
                selectedLabel: DATE_MENU_VALUES[key].label
            });
            this.props.changeDate(dateString);
        } 
        else {
            this.setState({showModal: true});
        }
        
    }

    onChangeDate = (date) => {
        let filter = { ...this.state.filter };
        //console.log(date,dateString);
        filter.start_time = date[0].format(dateFormat);
        filter.end_time = date[1].format(dateFormat);
        this.setState({ filter });

        // getDashboard(this.setData, 'users-by-date', {
        //     start_time: date[0] ? date[0].format('Y-M-D') : '',
        //     end_time: date[1] ? date[1].format('Y-M-D') : '',
        // });

    }

    modalOk = ()=>{
        this.setState({showModal: false});
        let filter = { ...this.state.filter };
        let dateString = [filter.start_time, filter.end_time];
        this.setState({
            selectedLabel: DATE_MENU_VALUES[3].label
        });
        this.props.changeDate(dateString);
    }

    hideModal = ()=>{
        this.setState({showModal: false});
    }

    render() {
        let { title, value, icon, isLoading, changeDate, t } = this.props;
        let { selectedKeys, selectedLabel, showModal } = this.state;
        return (
            <div>
                <Modal
                    visible={showModal}
                    onOk={this.modalOk}
                    onCancel={this.hideModal}
                    cancelText={t("manage.dashboard.modal.cancel")}
                    okText={t("manage.dashboard.modal.ok")}
                    
                >
                    <DatePicker.RangePicker
                        onChange={this.onChangeDate}
                        format="D-M-Y"
                    />
                </Modal>
                {isLoading ? <Icon type="loading" /> : <Icon type={icon} />} {value} {title}
                {changeDate && !isLoading &&
                    <div style={{ float: 'right' }}>
                        <Dropdown trigger={['click']} overlay={
                            <Menu
                                selectedKeys={[selectedKeys]}
                                onClick={this.filterChange}
                            >{DATE_MENU_ITEMS}</Menu>}>
                            <Button size="small">
                                {selectedLabel}<Icon type="down" />
                            </Button>
                        </Dropdown>
                    </div>
                }

            </div>);
    }
}
export default translate(props => props.namespaces)(CardTitle);