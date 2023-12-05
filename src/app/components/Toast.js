"use client";
import React, { useEffect } from "react";
import { useThemeContext } from "../context/theme";

const Toast = ({ msg }) => {
  const { showToast, setShowToast } = useThemeContext();

  useEffect(() => {
    setInterval(() => {
      setShowToast(null);
    }, 5000);
  }, [showToast]);

  return (
    <div className="toast toast-top toast-end z-20">
      <div className="alert alert-success">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast;
