import React from "react";
import PropTypes from "prop-types";

import styles from "./Inserts.less";

const Uwaga = ({children}) => <div className={styles.uwaga}>{children}</div>
Uwaga.propTypes = {
  children: PropTypes.node.isRequired
}

export { 
  Uwaga
}