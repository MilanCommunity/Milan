import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  size = "",
  to = "",
  ...props
}) => {
  const classes = `btn ${styles.btn} ${className} ${styles[variant]} ${
    size ? styles[size] : ""
  }`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
