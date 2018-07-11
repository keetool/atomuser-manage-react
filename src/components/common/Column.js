import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col } from "antd";


export default class Column extends Component {
    render() {
        let {scales,children,className,style} = this.props;
        if(!scales) scales = {};
        return (
            <div style={style}>
            <Col
                xs={scales.xs} 
                sm={scales.sm} 
                md={scales.md} 
                lg={scales.lg} 
                xl={scales.xl} 
                span={scales.span} 
                className={className} 
            >
                {children}
            </Col>
            </div>
        );
    }
}


Column.propTypes = {
    scales: PropTypes.object,
    children: PropTypes.object,
    className: PropTypes.string,
    
};

//export default Card.create()(CustomCard);
