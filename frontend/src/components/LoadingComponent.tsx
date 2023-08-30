import React from "react";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const LoadingComponent: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ClimbingBoxLoader color="#b85a18" size={50} />
    </div>
  );
};

export default LoadingComponent;
