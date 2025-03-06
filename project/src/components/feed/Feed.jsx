// import React, { useState, useEffect } from "react";
// import "./feed.css";
// import Masonry from "react-masonry-css";

// const Api = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       let response = await fetch(
//         "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/storage/master/data/db.json",
//         { cache: "no-store" }
//       );
//       let result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const breakpointColumns = {
//     default: 3,
//     1100: 2,
//     700: 1,
//   };

//   return (
//     <>
//       <div className="container">
//         {loading ? (
//           <div className="loading-container">
//             <video
//               src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/non-veg-food-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--meat-dish-masala-plate-restaurant-foods-pack-drink-icons-8786833.mp4"
//               autoPlay
//               loop
//               muted
//               className="loading-animation"
//             />
//           </div>
//         ) : error ? (
//           <p className="error">Error: {error}</p>
//         ) : (
//           <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-column">
//             {data.length === 0 ? (
//               <p>No media available</p>
//             ) : (
//               data.map((item, index) => (
//                 <div key={index} className="media-item">
//                   {item.image ? (
//                     <img src={item.image} alt={item.alt || `Image ${index + 1}`} className="media-image" />
//                   ) : item.video ? (
//                     <video className="media-video" src={item.video} controls muted autoPlay loop playsInline />
//                   ) : null}
//                 </div>
//               ))
//             )}
//           </Masonry>
//         )}
//       </div>
//     </>
//   );
// };

// export default Api;
import React, { useState, useEffect } from "react";
import "./feed.css";
import Masonry from "react-masonry-css";
import { Modal, Button } from "react-bootstrap";

const Api = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mediaType, setMediaType] = useState(null); // Track media type (image/video)

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        "https://raw.githubusercontent.com/BojanapalliRajyaLaxmi/storage/master/data/db.json",
        { cache: "no-store" }
      );
      let result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  // Open modal and set media type
  const openModal = (index, type) => {
    setSelectedIndex(index);
    setMediaType(type);
  };

  // Close modal
  const closeModal = () => {
    setSelectedIndex(null);
    setMediaType(null);
  };

  // Get Next Media Index (Same Type)
  const getNextMediaIndex = () => {
    for (let i = selectedIndex + 1; i < data.length; i++) {
      if ((mediaType === "image" && data[i].image) || (mediaType === "video" && data[i].video)) {
        return i;
      }
    }
    return selectedIndex; // Stay on same if no more media
  };

  // Get Previous Media Index (Same Type)
  const getPrevMediaIndex = () => {
    for (let i = selectedIndex - 1; i >= 0; i--) {
      if ((mediaType === "image" && data[i].image) || (mediaType === "video" && data[i].video)) {
        return i;
      }
    }
    return selectedIndex; // Stay on same if no more media
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <div className="loading-container">
            <video
              src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/non-veg-food-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--meat-dish-masala-plate-restaurant-foods-pack-drink-icons-8786833.mp4"
              autoPlay
              loop
              muted
              className="loading-animation"
            />
          </div>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <Masonry breakpointCols={breakpointColumns} className="masonry-grid" columnClassName="masonry-column">
            {data.length === 0 ? (
              <p>No media available</p>
            ) : (
              data.map((item, index) => (
                <div key={index} className="media-item" onClick={() => openModal(index, item.image ? "image" : "video")}>
                  {item.image ? (
                    <img src={item.image} alt={item.alt || `Image ${index + 1}`} className="media-image" />
                  ) : item.video ? (
                    <video className="media-video" src={item.video} muted autoPlay loop playsInline />
                  ) : null}
                </div>
              ))
            )}
          </Masonry>
        )}
      </div>

      {/* Bootstrap Modal for Media Preview */}
      <Modal show={selectedIndex !== null} onHide={closeModal} centered size="lg" fullscreen="md-down">
        <Modal.Body className="text-center position-relative">
          {selectedIndex !== null && mediaType === "image" && data[selectedIndex]?.image && (
            <>
              {/* Previous Button */}
              <Button
                className="position-absolute start-0 top-50 translate-middle-y"
                style={{ zIndex: 10 }}
                onClick={() => setSelectedIndex(getPrevMediaIndex())}
                disabled={selectedIndex === getPrevMediaIndex()}
              >
                &#60;
              </Button>

              {/* Display Image */}
              <img src={data[selectedIndex].image} alt="Selected Media" className="img-fluid" />

              {/* Next Button */}
              <Button
                className="position-absolute end-0 top-50 translate-middle-y"
                style={{ zIndex: 10 }}
                onClick={() => setSelectedIndex(getNextMediaIndex())}
                disabled={selectedIndex === getNextMediaIndex()}
              >
                &#62;
              </Button>
            </>
          )}

          {selectedIndex !== null && mediaType === "video" && data[selectedIndex]?.video && (
            <>
              {/* Previous Button */}
              <Button
                className="position-absolute start-0 top-50 translate-middle-y"
                style={{ zIndex: 10 }}
                onClick={() => setSelectedIndex(getPrevMediaIndex())}
                disabled={selectedIndex === getPrevMediaIndex()}
              >
                &#60;
              </Button>
              <video src={data[selectedIndex].video} controls autoPlay className="img-fluid" />
              <Button
                className="position-absolute end-0 top-50 translate-middle-y"
                style={{ zIndex: 10 }}
                onClick={() => setSelectedIndex(getNextMediaIndex())}
                disabled={selectedIndex === getNextMediaIndex()}
              >
                &#62;
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Api;
