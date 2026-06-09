import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export default function uploadFile(file) {
  if (!file) return Promise.resolve("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  if (!token) return Promise.resolve("");

  return api
    .post(
      `${API_ROUTE.UPLOADS}/cloudinary-signature`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(async ({ data }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp);
      formData.append("signature", data.signature);
      formData.append("folder", data.folder);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const uploadResult = await response.json();
      return uploadResult.secure_url || "";
    });
}
