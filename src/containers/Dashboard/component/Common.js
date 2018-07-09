import React from "react";
import moment from "moment";
import { Icon, Dropdown, Menu, Button } from "antd";
import { Tooltip, } from "bizcharts";
import { translateI18n as t } from '../../../languages/i18n';
export const dateFormater = (val) => {
    let res = moment(val).format('D/M');
    return res;
};

export const chartScale = {
    date: {
        type: "cat",
        range: [0, 1]
    },
};

export const mainColor = '#1890ff';

const DATE_MENU_VALUES = [
    {label: t("manage.dashboard.datepicker.15_days"), value: "1"},
    {label: t("manage.dashboard.datepicker.30_days"), value: "2"},
    {label: t("manage.dashboard.datepicker.7_days"), value: "3"},
];
const DATE_MENU = (
    <Menu onClick={(e) => { console.log(e.item.props.value); }} >
        {
            DATE_MENU_VALUES.map((obj, index)=>{
                return <Menu.Item key={index} value={obj}>{obj.label}</Menu.Item>;
            })
    }</Menu>
);
export class CardTitle  extends React.Component {
    constructor(props) {
        super(props);   
    }
    //
    render() {
        let {title, value, icon, isLoading, changeDate}  =this.props;
        return (
        <div>
            {isLoading ? <Icon type="loading" /> : <Icon type={icon} />} {value} {title}
            {/* {value && !isLoading &&
                <div>{value}</div>
            } */}
            {changeDate && !isLoading &&
                <div style={{ float: 'right' }}>
                    {/* <Dropdown
                        onChange={changeDate}
                        format="D-M-Y"
                    /> */}
                    <Dropdown overlay={DATE_MENU}>
                        <Button>
                            7 ngày qua<Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>
            }

        </div>);
    }
}

export const cardTooltip = (title) => {
    return (
        <Tooltip
            containerTpl='<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>'
            itemTpl={'<tr class="g2-tooltip-list-item"><td style="color:{color}">' + title + ': </td><td>{value}</td></tr>'}
        />
    );
};