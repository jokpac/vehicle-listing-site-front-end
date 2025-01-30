import React from 'react';

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

export default ImageUpload;
