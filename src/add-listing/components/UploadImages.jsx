import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { db } from "../../../configs";
import { CarImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";

const UploadImages = forwardRef(({ triggerUploadImages, setLoader, carInfo, mode }, ref) => {
  const [selectedFileList, setSelectedFilelist] = useState([]);
  const [editCarImageList, setEditCarImageList] = useState([]);

  const cloudName = "dwqsljwtr";
  const uploadPreset = "car_images";
  const fallbackImage = "https://placehold.co/400x300?text=No+Image";

  useEffect(() => {
    if (mode === "edit" && carInfo?.images?.length > 0) {
      setEditCarImageList(carInfo.images.map((img) => img.imageUrl));
    }
  }, [carInfo, mode]);

  // Expose uploadAllImages to parent component
  useImperativeHandle(ref, () => ({
    uploadAllImages: async (listingId) => {
      if (selectedFileList.length === 0) return; // nothing new to upload

      setLoader(true);

      for (let i = 0; i < selectedFileList.length; i++) {
        const file = selectedFileList[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: formData }
          );

          const data = await res.json();
          if (data.secure_url) {
            await db.insert(CarImages).values({
              imageUrl: data.secure_url,
              carListingId: listingId,
            });
          }
        } catch (err) {
          console.error("Upload error:", err);
        }
      }

      setSelectedFilelist([]);
      setLoader(false);
    },
  }));

  useEffect(() => {
    if (triggerUploadImages) {
      ref.current.uploadAllImages(triggerUploadImages);
    }
  }, [triggerUploadImages]);

  const onFileSelected = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files?.length; i++) {
      setSelectedFilelist((prev) => [...prev, files[i]]);
    }
  };

  const onImageRemoveFromDB = async (imageUrl, index) => {
    try {
      await db.delete(CarImages).where(eq(CarImages.imageUrl, imageUrl));
      setEditCarImageList((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const onImageRemove = (index) => {
    setSelectedFilelist((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {mode === "edit" &&
          editCarImageList.map((image, index) => (
            <div key={index} className="relative">
              <IoCloseCircle
                className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer z-10 hover:text-red-700"
                onClick={() => onImageRemoveFromDB(image, index)}
              />
              <img
                src={image}
                alt={`uploaded-${index}`}
                className="w-full h-[130px] object-cover rounded-xl"
              />
            </div>
          ))}

        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoCloseCircle
              className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer z-10 hover:text-red-700"
              onClick={() => onImageRemove(index)}
            />
            <img
              src={URL.createObjectURL(image)}
              alt={`uploaded-${index}`}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}

        <label
          htmlFor="upload-images"
          className="border rounded-xl border-dotted border-red-900 bg-[#ecd7d9] p-10 cursor-pointer hover:shadow-md flex items-center justify-center"
        >
          <h2 className="text-lg text-center text-red-900">+</h2>
        </label>

        <input
          type="file"
          multiple
          id="upload-images"
          onChange={onFileSelected}
          className="hidden"
        />
      </div>

      {mode === "add" && selectedFileList.length === 0 && (
        <div className="mt-4 text-sm text-gray-500">
          *If you don't upload an image, a default placeholder image will be shown.
        </div>
      )}
    </div>
  );
});

export default UploadImages;
