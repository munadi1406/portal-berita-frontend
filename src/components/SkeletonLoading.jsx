import './assets/skeletonLoading.css'

const SkeletonLoading = () => {
  return (
    <div className="card h-96 ">
    <div className="skeleton-image"></div>
    <div className="card-body ">
      <div className="skeleton-title"></div>
      <div className="skeleton-date"></div>
      <div className="skeleton-category"></div>
      <div className="skeleton-content"></div>
      <div className="card-actions">
        <div className="skeleton-button"></div>
      </div>
    </div>
  </div>
  );
};

export default SkeletonLoading;
