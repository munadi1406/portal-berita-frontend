import './assets/CarouselSkeleton.css'
export default function SkeletonCarousel() {
  return (
    <>
      <div className="skeleton-carousel">
        <div className="skeleton-slide">
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-category"></div>
            <div className="skeleton-category"></div>
            <div className="skeleton-date"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="skeleton-image"></div>
          <div className="skeleton-overlay"></div>
        </div>
      </div>
    </>
  );
}
