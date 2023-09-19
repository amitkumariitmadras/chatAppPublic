import React, { useState, useEffect } from "react";

function ZoomableImage({ imageUrl }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isZoomed &&
        event.target === document.querySelector(".zoomed-image")
      ) {
        closeZoom();
      }
    };

    if (isZoomed) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isZoomed]);

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Image"
        className={`cursor-pointer ${
          isZoomed ? "w-screen h-screen object-contain" : "w-40 h-40"
        }`}
        onClick={toggleZoom}
      />
      {isZoomed && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-100 flex items-center justify-center zoomed-image">
          <img
            src={imageUrl}
            alt="Zoomed Image"
            className="max-h-full max-w-full"
            onClick={toggleZoom}
          />
        </div>
      )}
    </div>
  );
}

export default ZoomableImage;
