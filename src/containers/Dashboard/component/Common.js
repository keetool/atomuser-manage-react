import React from "react";
import moment from "moment";
import { Icon, } from "antd";
import { Tooltip, } from "bizcharts";

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

export const cardTitle = (title, value, icon, isLoading) => {
    return (
        <div>
            {isLoading ? <Icon type="loading" /> : <Icon type={icon} />} {title}
            <b style={{ float: 'right' }}>{value}</b>
        </div>);
};

export const cardTooltip = (title) => {
    return (
        <Tooltip
            containerTpl='<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>'
            itemTpl={'<tr class="g2-tooltip-list-item"><td style="color:{color}">' + title + ': </td><td>{value}</td></tr>'}
        />
    );
}