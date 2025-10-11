import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import usePublicAxios from "../../Hooks/usePubliceAxios";
import useAxiosSecure from "../../Hooks/useAxiossecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddItem = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [currentColor, setCurrentColor] = useState("#aabbcc");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // store all image URLs after upload

  const axiospublic = usePublicAxios();
  const axiossecure = useAxiosSecure();
  const image_upload_token = import.meta.env.VITE_image_api_key;
  const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  // handle file selection and instant upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const newUploaded = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axiospublic.post(image_upload_api, formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        if (res.data.success) newUploaded.push(res.data.data.display_url);
      } catch (err) {
        console.error("Image upload failed", err);
        Swal.fire({ icon: "error", text: `Failed to upload ${file.name}` });
      }
    }

    setUploadedImages((prev) => [...prev, ...newUploaded]); // append new images
  };

  const onSubmit = async (data) => {
    if (!uploadedImages.length) {
      toast.error("Please upload at least one image!")
      return;
    }

    if (!data.colors || data.colors.length === 0) {
      toast.error("Pick at least one color!")
      return;
    }

    const itemData = {
      name: data.name,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      shape: data.shape,
      category: data.category,
      details: data.details,
      colors: data.colors,
      images: uploadedImages, 
    };

    try {
      const res = await axiossecure.post("allitems", itemData);
      if (res.data.insertedId) {
        toast.success("Item Added Successfully")
        reset();
        setUploadedImages([]);
        setCurrentColor("#aabbcc");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item!")
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center">Add New Glass</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" placeholder="Glass name" />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input type="number" {...register("price", { required: true })} className="input input-bordered w-full" placeholder="Price in ৳" />
          {errors.price && <span className="text-red-500">Price is required</span>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input type="number" {...register("quantity", { required: true })} className="input input-bordered w-full" placeholder="Available quantity" />
          {errors.quantity && <span className="text-red-500">Quantity is required</span>}
        </div>

        {/* Shape */}
        <div>
          <label className="block font-medium mb-1">Shape</label>
          <select {...register("shape", { required: true })} className="select select-bordered w-full">
            <option value="">Select Shape</option>
            <option value="Round">Round</option>
            <option value="Geometric">Geometric</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Cat-Eye">Cat-Eye</option>
          </select>
          {errors.shape && <span className="text-red-500">Shape is required</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select {...register("category", { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="eyeglass">Eyeglass</option>
            <option value="sunglass">Sunglass</option>
            <option value="powerglass">Powerglass</option>
            <option value="kidsglass">Kids Glass</option>
          </select>
          {errors.category && <span className="text-red-500">Category is required</span>}
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">Upload Images</label>
          <input type="file" multiple onChange={handleFileChange} className="file-input file-input-secondary w-full" />
          {uploadedImages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {uploadedImages.map((url, idx) => (
                <img key={idx} src={url} alt={`Glass ${idx}`} className="w-14 h-14 object-cover rounded" />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Details</label>
          <textarea {...register("details", { required: true })} className="textarea textarea-bordered w-full" placeholder="Glass details" />
          {errors.details && <span className="text-red-500">Details are required</span>}
        </div>

        {/* Colors */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-2">Pick Colors</label>
          <Controller
            control={control}
            name="colors"
            defaultValue={[]}
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center gap-3 flex-wrap">
                {value.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(value.filter((c) => c !== color))}
                    title="Click to remove"
                  />
                ))}
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  title="Pick a color"
                >
                  +
                </button>
                {showColorPicker && (
                  <div className="mt-2">
                    <HexColorPicker color={currentColor} onChange={setCurrentColor} />
                    <button
                      type="button"
                      className="btn btn-sm mt-2 bg-fuchsia-600 text-white"
                      onClick={() => {
                        if (!value.includes(currentColor)) onChange([...value, currentColor]);
                        setShowColorPicker(false);
                      }}
                    >
                      Add Color
                    </button>
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button type="submit" className="btn px-8 py-3 text-white font-semibold bg-gradient-to-r from-fuchsia-600 via-pink-500 to-indigo-600 hover:from-indigo-600 hover:via-pink-500 hover:to-fuchsia-600 transition-colors duration-300">
            Add Glass
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
