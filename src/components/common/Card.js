import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";


export default class CustomCard extends Component {
    render() {
        let {title,style,children,className,bordered,onClick,} = this.props;
        return (
            <Card
                style={{...style}}
                title={title || ''}
                bordered={bordered}
                className={className}
                onClick={onClick}
            >
                {children}
            </Card>
        );
    }
}


CustomCard.propTypes = {
    style: PropTypes.object,
    children: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
    rules: PropTypes.array,
    bordered: PropTypes.bool,
    onClick: PropTypes.func
};

//export default Card.create()(CustomCard);
