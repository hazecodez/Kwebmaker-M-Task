const cloudinary = require("cloudinary").v2;

const uploadImage = async (file, folder) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const response = await cloudinary.uploader.upload(file, {
      folder: `kWebMaker/${folder}`,
    });
    return response.public_id;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { uploadImage };
