import React from "react";
import Header from "../../components/Header";

const WithHeader = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default WithHeader;
