import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePubliceAxios from "../../Hooks/usePubliceAxios";
import ImageGallery from "react-image-gallery";
import Zoom from "react-medium-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-medium-image-zoom/dist/styles.css";
import { FaCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { authcontext } from "../../Providers/Authprovider";
import useAxiossecure from "../../Hooks/useAxiossecure";
import { toast } from "react-toastify";
import useOrder from "../../Hooks/useOrder"
import { FaCircleArrowRight } from "react-icons/fa6";
const CardDetails = () => {
  const {user}=useContext(authcontext)
  const [orders,refetch]=useOrder()
  const { id } = useParams();
  const axiospublic = usePubliceAxios();
  const axiosSecure=useAxiossecure()
  const { data: item=[] } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await axiospublic.get(`allitems/${id}`);
      return res.data;
    },
  });

  const [selectedColor, setSelectedColor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputqty, setinputqty] = useState(1);
  const { name, details, price, images = [], shape, colors = [], quantity} = item;
  const galleryItems = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));
const handleaddcart=()=>{
  const cartitem={
           cartid:id,
           email:user.email,
           name:name,
           image:images[0],
           price:price,
           orderqty:inputqty,
           availableqty:quantity,
  }
console.log(cartitem)
axiosSecure.post('allorders',cartitem)
.then(res=>{
  if(res.data.insertedId){
    toast.success('Your item added in shopping Cart')
  }
  refetch();
})
}
  return (
    <div className="flex md:flex-row flex-col gap-8 p-6 bg-gray-50 rounded-2xl shadow">
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
        <div className="flex gap-3">
  {colors.map((color, idx) => (
    <FaCircle
      key={idx}
      className={`p-1 rounded-full cursor-pointer transition ${
        selectedColor === color ? "ring-2 ring-indigo-500" : "ring-1 ring-gray-300"
      }`}
      size={32}
      color={color}
      onClick={() => setSelectedColor(color)}
    />
  ))}
</div>
        </div>

        <p className="font-medium text-gray-700 mb-2">Available: 
          {quantity-inputqty}</p>
       
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-5 bg-gray-200 w-fit text-xl font-bold px-3 py-2 rounded-full hover:border-2 border-orange-500">
        <FaMinus 
        className="cursor-pointer"
        onClick={()=>setinputqty(prev=>Math.max(1,prev-1))}
        />
         <span className="px-2 ">{inputqty}</span>
        <FaPlus 
        className="cursor-pointer"
        onClick={()=>setinputqty(prev=>Math.min(quantity,prev+1))}
        />
       </div>
          <button onClick={handleaddcart} className=" px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition cursor-pointer"disabled={quantity <= 0}>
            {quantity <=0 ? 'Out of Stock' : 'Add to cart'}
          </button>     
        </div>
        <Link to={'/orders'}  disabled={orders.length < 1}
                    className={`btn text-xl my-4 py-6
                        ${orders.length < 1
                            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                            : 'bg-[#e9004b] text-white hover:text-[#e9004b] hover:bg-white hover:border-red-600'}`}>
            Checkout <FaCircleArrowRight className="pt-1 text-2xl"/>
        </Link> 
      </div>
    </div>
  );
};

export default CardDetails;
