import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class CloudinaryAPI {
  folder: string;

  constructor(folder: string) {
    this.folder = folder;
  }

  async upload(tempPath: string) {
    const fileData = await cloudinary.v2.uploader.upload(tempPath, {
      folder: this.folder,
      format: "webp", // Convert the image to WebP format
    });

    return fileData;
  }

  async uploadVIPPoster(tempPath: string) {
    const fileData = await cloudinary.v2.uploader.upload(tempPath, {
      quality: 95, // Reduce image quality to a lower setting
      folder: this.folder,
      format: "webp", // Convert the image to WebP format
    });

    return fileData;
  }

  async uploadPoster(tempPath: string) {
    const fileData = await cloudinary.v2.uploader.upload(tempPath, {
      width: 800, // Resize to a maximum width of 800px
      height: 450, // Resize to a maximum height of 450px
      quality: 50, // Reduce image quality to a lower setting
      crop: "limit", // Crop the image to fit within the specified dimensions
      progressive: true, // Enable progressive JPEG encoding
      folder: this.folder, // Optional: Specify a folder in Cloudinary
      format: "webp", // Convert the image to WebP format
    });

    return fileData;
  }

  async delete(fileID: string) {
    await cloudinary.v2.uploader.destroy(fileID);
  }
}

const cloudinaryUserAPI = new CloudinaryAPI("avatars"); // create instance for User avatars
const cloudinaryProjectAPI = new CloudinaryAPI("posters"); // create instance for Project posters

export { cloudinaryUserAPI, cloudinaryProjectAPI };
