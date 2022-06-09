import { toast } from "react-toastify";
import axios from "axios";

export interface IUploadedFileRes {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  url: string;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}

export const cloudinary_endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

export async function uploadImage(files: File[]): Promise<string[]> {
  let images: string[] = [];
  try {
    files.forEach(async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "");
      fd.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME || ""
      );
      const { data } = await axios.post<IUploadedFileRes>(
        cloudinary_endpoint,
        fd
      );
      images.push(data.url);
    });
  } catch (error) {
    toast.error("Image upload failed !!");
    console.log(error);
    images = ["/assets/images/placeholder.png"];
  }
  return images;
}
