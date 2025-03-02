export default function Carousel({ children }) {
    return (
      <div className="relative w-full overflow-hidden">
        {/* Slides Container */}
        <div className="flex transition-transform duration-500 ease-in-out" id="carousel-slides">
          {children}
        </div>
  
        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={() => {
            const slides = document.getElementById("carousel-slides");
            slides.scrollBy({ left: -slides.offsetWidth, behavior: "smooth" });
          }}
        >
          &#10094; {/* Left Arrow */}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={() => {
            const slides = document.getElementById("carousel-slides");
            slides.scrollBy({ left: slides.offsetWidth, behavior: "smooth" });
          }}
        >
          &#10095; {/* Right Arrow */}
        </button>
      </div>
    );
  }