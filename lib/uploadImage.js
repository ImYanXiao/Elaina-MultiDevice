                               

import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

   
                             
                      
                 
                
                
                
                                      
   
export default async function uploadImage(buffer) {
  let { ext } = await fileTypeFromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");

  let res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });

  let data = await res.text();
  return data;
}
