import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import usePubliceAxios from "../../Hooks/usePubliceAxios";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-medium-image-zoom/dist/styles.css";

const CardDetails = () => {
  const { id } = useParams();
  const axiospublic = usePubliceAxios();
  const { data: item = {}, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await axiospublic.get(`allitems/${id}`);
      return res.data;
    },
  });

  const [selectedColor, setSelectedColor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputqty, setinputqty] = useState(1); // ✅ added missing state

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <button className="btn loading text-white bg-indigo-500 border-none">
          Loading
        </button>
      </div>
    );
  }

  const { name, details, price, images = [], shape, colors = [], quantity } = item;

  const galleryItems = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="flex md:flex-row flex-col gap-8 p-6 bg-gray-50 rounded-2xl shadow">
      {/* Left: Gallery */}
      <div className="flex-1">
        <ImageGallery
          items={galleryItems}
          showPlayButton={false}
          showFullscreenButton={false}
          onSlide={(index) => setCurrentIndex(index)}
          showNav={false}
          thumbnailPosition="bottom"
          renderItem={(item) => (
            <div className="w-full flex justify-center">
              <Zoom>
                <img
                  src={item.original}
                  alt={name}
                  className="object-contain w-full max-h-[400px]"
                />
              </Zoom>
            </div>
          )}
          renderThumbInner={(item) => (
            <img
              src={item.thumbnail}
              alt="thumb"
              className="w-full h-20 object-cover rounded-md"
            />
          )}
        />
      </div>

      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 line-clamp-4">{details}</p>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Shape</p>
            <p className="font-semibold">{shape || "—"}</p>
          </div>
          <div className="ml-6">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-indigo-600">৳ {price}</p>
          </div>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-2">Choose Colour</p>
          <div className="flex gap-3 items-center">
            {colors.map((color, idx) => (
              <svg
                key={idx}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`w-10 h-10 cursor-pointer rounded-full border transition-all ${
                  selectedColor === color ? "ring-2 ring-indigo-400" : ""
                }`}
              >
                <circle cx="50%" cy="50%" r="50%" fill={color} />
              </svg>
            ))}
          </div>
        </div>

        <p className="font-medium text-gray-700 mb-2">Available: {quantity}</p>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={inputqty}
            onChange={(e) => setinputqty(parseInt(e.target.value) || 1)}
            className="px-4 py-3 text-lg border-2 border-gray-300 hover:border-orange-500 rounded-md w-40"
            min="1"
            max={quantity}
            disabled={quantity <= 0}
          />

          <button className=" px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"disabled={quantity <= 0}>
            {quantity <=0 ? 'Out of Stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
