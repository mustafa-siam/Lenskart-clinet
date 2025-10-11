import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import usePublicAxios from "../../Hooks/usePubliceAxios";

const Editglasscart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = usePublicAxios();
  const image_upload_token = import.meta.env.VITE_image_api_key;
  const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const [item, setItem] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentColor, setCurrentColor] = useState("#aabbcc");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    axiosPublic.get(`allitems/${id}`).then((res) => {
      setItem(res.data);
      setUploadedImages(res.data.images || []);
      setValue("colors", res.data.colors || []);
    });
  }, [id, axiosPublic, setValue]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);
      axiosPublic.post(image_upload_api, formData, { headers: { "content-type": "multipart/form-data" } })
        .then(res => {
          if (res.data?.data?.display_url) {
            setUploadedImages(prev => [...prev, res.data.data.display_url]);
          }
        })
        .catch(() => toast.error(`Failed to upload ${file.name}`));
    });
  };

  const removeImage = (index) => setUploadedImages(prev => prev.filter((_, i) => i !== index));

  const onSubmit = (data) => {
    if (!uploadedImages.length) return toast.error("Upload at least one image");
    if (!data.colors || !data.colors.length) return toast.error("Pick at least one color");

    const itemData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      images: uploadedImages,
    };

    axiosPublic.patch(`allitems/${id}`, itemData).then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success("Glass updated successfully");
      } else {
        toast.info("No changes made");
      }
    });
  };

  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center">Edit Glass Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input defaultValue={item.name} {...register("name")} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input defaultValue={item.price} type="number" {...register("price")} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input defaultValue={item.quantity} type="number" {...register("quantity")} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Shape</label>
          <select defaultValue={item.shape} {...register("shape")} className="select select-bordered w-full">
            <option value="">Select Shape</option>
            <option value="Round">Round</option>
            <option value="Geometric">Geometric</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Cat-Eye">Cat-Eye</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select defaultValue={item.category} {...register("category")} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="eyeglass">Eyeglass</option>
            <option value="sunglass">Sunglass</option>
            <option value="powerglass">Powerglass</option>
            <option value="kidsglass">Kids Glass</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input type="file" multiple onChange={handleFileChange} className="file-input file-input-secondary w-full" />
          {uploadedImages.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {uploadedImages.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} className="w-14 h-14 rounded object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Details</label>
          <textarea defaultValue={item.details} {...register("details")} className="textarea textarea-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Pick Colors</label>
          <div className="flex items-center gap-3 flex-wrap">
            {(item.colors || []).map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
                style={{ backgroundColor: color }}
                onClick={() => setValue("colors", (item.colors || []).filter(c => c !== color))}
              />
            ))}
            <button type="button" className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm" onClick={() => setShowColorPicker(!showColorPicker)}>+</button>
            {showColorPicker && (
              <div className="mt-2">
                <HexColorPicker color={currentColor} onChange={setCurrentColor} />
                <button type="button" className="btn btn-sm mt-2 bg-fuchsia-600 text-white" onClick={() => {
                  const colors = item.colors || [];
                  if (!colors.includes(currentColor)) setValue("colors", [...colors, currentColor]);
                  setShowColorPicker(false);
                }}>Add Color</button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 text-center">
          <button type="submit" className="btn px-8 py-3 bg-fuchsia-600 text-white">Update Glass</button>
        </div>
      </form>
    </div>
  );
};

export default Editglasscart;
