import React, { useState, useEffect } from "react";

export const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      // Delay the removal of the loading animation by 1.5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };
  }, []);

  return loading ? (
    <div className="loading">
      <img src="assets/loading/loading_trans.gif" alt="loading..." />
    </div>
  ) : null;
};
