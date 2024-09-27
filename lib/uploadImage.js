// import fetch from 'node-fetch';
// import FormData from 'form-data';
// import { fileTypeFromBuffer } from 'file-type'

// /**
//  * Upload image to telegra.ph
//  * Supported mimetype:
//  * - `image/jpeg`
//  * - `image/jpg`
//  * - `image/png`s
//  * @param {Buffer} buffer Image Buffer
//  * @return {Promise<string>}
//  */
// export default async buffer => {
// const { ext } = await fileTypeFromBuffer(buffer)
//   let form = new FormData
//   form.append('file', buffer, 'tmp.' + ext)
//   let res = await fetch('https://telegra.ph/upload', {
//     method: 'POST',
//     body: form
//   })
//   let img = await res.json()
//   if (img.error) throw img.error
//   return 'https://telegra.ph' + img[0].src
// }

// import { fileTypeFromBuffer } from 'file-type';
// import FormData from 'form-data';

// async function uploadToPomf2(content) {
//   console.log("Uploading to Pomf2...");

//   try {
//     const { ext, mime } = await fileTypeFromBuffer(content) || {
//       ext: "bin",
//       mime: "application/octet-stream"
//     };

//     const formData = new FormData();
//     const fileName = `upload_${Date.now()}.${ext || "bin"}`;

//     formData.append("files[]", Buffer.from(content), {
//       filename: fileName,
//       contentType: mime || "application/octet-stream"
//     });

//     const res = await fetch("https://pomf2.lain.la/upload.php", {
//       method: "POST",
//       body: formData
//     });

//     const json = await res.json();

//     if (!json.success) {
//       throw new Error(`Upload failed: ${json.error || 'Unknown error'}`);
//     }

//     console.log("Uploaded to Pomf2 successfully!");
//     return json.files[0]?.url;

//   } catch (error) {
//     console.error("Upload failed:", error.message || error);
//   }
// }

// export { uploadToPomf2 }

import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import fetch from 'node-fetch';

/**
 * Upload to Pomf2
 * @param {Buffer} content File Buffer
 * @return {Promise<string>}
 */
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
    console.error("Upload to Pomf2 failed:", error.message || error);
  }
}

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
async function uploadToTelegraph(buffer) {
  console.log("Uploading to telegra.ph...");

  try {
    const { ext } = await fileTypeFromBuffer(buffer);
    const form = new FormData();
    form.append('file', buffer, 'tmp.' + ext);

    const res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form
    });

    const img = await res.json();
    
    if (img.error) throw new Error(img.error);

    console.log("Uploaded to telegra.ph successfully!");
    return 'https://telegra.ph' + img[0].src;

  } catch (error) {
    console.error("Upload to telegra.ph failed:", error.message || error);
  }
}

/**
 * Upload to Imgur
 * @param {Buffer} imageBuffer Image Buffer
 * @param {string} clientId Imgur Client ID
 * @return {Promise<string>}
 */
async function uploadToImgur(imageBuffer, clientId) {
  console.log("Uploading to Imgur...");

  try {
    const form = new FormData();
    form.append('image', imageBuffer.toString('base64'));

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`
      },
      body: form
    });

    const json = await res.json();

    if (json.success) {
      console.log("Uploaded to Imgur successfully!");
      return json.data.link;
    } else {
      throw new Error(`Upload failed: ${json.data.error || 'Unknown error'}`);
    }

  } catch (error) {
    console.error("Upload to Imgur failed:", error.message || error);
  }
}

/**
 * Upload to File.io
 * @param {Buffer} fileBuffer File Buffer
 * @return {Promise<string>}
 */
async function uploadToFileIO(fileBuffer) {
  console.log("Uploading to File.io...");

  try {
    const form = new FormData();
    form.append('file', fileBuffer);

    const res = await fetch('https://file.io', {
      method: 'POST',
      body: form
    });

    const json = await res.json();

    if (json.success) {
      console.log("Uploaded to File.io successfully!");
      return json.link;
    } else {
      throw new Error(`Upload failed: ${json.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error("Upload to File.io failed:", error.message || error);
  }
}

export { uploadToPomf2, uploadToTelegraph, uploadToImgur, uploadToFileIO };
