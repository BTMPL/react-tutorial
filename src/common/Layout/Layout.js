import React from "react";
import PropTypes from "prop-types";
import style from "./Layout.less";

export const Column = ({width, mobileWidth, children, className}) => {
  return (
    <div className={`${style.column} ${style['desktop-' + width]} ${style['mobile-' + mobileWidth]} ${className}`}>
      {children}
    </div>
  )
}

Column.propTypes = {
  width: PropTypes.number,
  mobileWidth: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string
}

Column.defaultProps = {
  width: 12,
  mobileWidth: 12,
  className: ''
}

export const Row = ({children, narrow, full, className}) => <div className={`${style.row} ${narrow ? style.narrow : ''} ${full ? style.full : ''} ${className}`}>{children}</div>;

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  narrow: PropTypes.bool,
  full: PropTypes.bool
}

Row.defaultProps = {
  narrow: false,
  className: ''
}

export const Align = ({center, right, left, children}) => <div className={`${style[center ? 'center' : left ? 'left' : 'right']}`}>{children}</div>

Align.propTypes = {
  center: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
  children: PropTypes.node,
}