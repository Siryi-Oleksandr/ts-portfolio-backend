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
    });

    return fileData;
  }

  async uploadAvatar(tempPath: string) {
    cloudinary.v2.image("samples/two-ladies.jpg", {
      gravity: "faces",
      height: 800,
      width: 800,
      crop: "thumb",
    });

    const fileData = await cloudinary.v2.uploader.upload(tempPath, {
      folder: this.folder,
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
