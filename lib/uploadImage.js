import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';

async function uploadToPomf2(content) {
  console.log("Uploading to Pomf2...");

  try {
    const { ext, mime } = await fileTypeFromBuffer(content) || {
      ext: "bin",
      mime: "application/octet-stream"
    };

    const formData = new FormData();
    const fileName = `upload_${Date.now()}.${ext || "bin"}`;

    formData.append("files[]", Buffer.from(content), {
      filename: fileName,
      contentType: mime || "application/octet-stream"
    });

    const res = await fetch("https://pomf2.lain.la/upload.php", {
      method: "POST",
      body: formData
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(`Upload failed: ${json.error || 'Unknown error'}`);
    }

    console.log("Uploaded to Pomf2 successfully!");
    return json.files[0]?.url;

  } catch (error) {
    console.error("Upload failed:", error.message || error);
  }
}

export { uploadToPomf2 }
