import React from "react";
import moment from "moment";

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
export const dateFormat = 'Y-M-D';

export const DATE_MENU_VALUES = [
    {label: t("manage.dashboard.datepicker.7_days"), value: "3", days: 7},
    {label: t("manage.dashboard.datepicker.15_days"), value: "1",days: 15},
    {label: t("manage.dashboard.datepicker.30_days"), value: "2",days: 30},
    {label: t("manage.dashboard.datepicker.other"), value: "4",days: 30},
];



export const cardTooltip = (title) => {
    return (
        <Tooltip
            containerTpl='<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>'
            itemTpl={'<tr class="g2-tooltip-list-item"><td style="color:{color}">' + title + ': </td><td>{value}</td></tr>'}
        />
    );
};