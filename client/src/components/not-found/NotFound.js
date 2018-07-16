import React from "react";

export default props => {
  return (
    <div>
      <h1 className="display-4">{props.message || "Page Not Found"}</h1>
      <p>Nothing to see here.</p>
    </div>
  );
};
