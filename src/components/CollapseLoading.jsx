import React from 'react';

const CollapseLoading = () => {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="skeleton-title"></div>
      <div className="skeleton-content"></div>
    </div>
  );
};

export default CollapseLoading;
