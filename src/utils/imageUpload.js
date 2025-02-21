import React from 'react';
import axiosInstance from '../data/AxiosInstance';

// Image logic for ListingForm.js
const ImageUpload = ({ uploadedImages, uploadImage, imageURL }) => (
    <fieldset className="image-upload-section">
        <legend>Images</legend>

        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files[0]) {
                    uploadImage(e.target.files[0]);
                }
            }}
        />

        <div className="uploaded-images">
            {uploadedImages.map((image) => (
                <div key={image.id} className="uploaded-image">
                    <img
                        src={`${imageURL}/${image.id}`}
                        alt={`Uploaded ${image.fileName}`}
                        className="image-preview"
                    />
                </div>
            ))}
        </div>
    </fieldset>
);

const imageUploadURL = 'http://localhost:8080/images/upload';

// Image upload logic used in listingFormUtils.js
export const uploadImage = async (file, setUploadedImages) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosInstance.post(imageUploadURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status !== 200) {
            throw new Error(response.data);
        }

        const result = response.data;
        const imageId = result.split(": ")[1];

        setUploadedImages((prev) => [...prev, { id: imageId, fileName: file.name, file }]);
    } catch (error) {
        console.error("Image upload failed:", error.response?.data || error.message);
    }
};

export default ImageUpload;
