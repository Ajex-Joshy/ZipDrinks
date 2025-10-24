import axios from "axios";

export default async function handleImageUpload(e){
      const file = e.target.files[0];
      if(!file) return

      const data = new FormData()
      data.append("file" , file)
      data.append("upload_preset" , "First_Time_Cloudinary")
      data.append("cloud_name" , "dlpiwweof")

      let response = await axios.post("https://api.cloudinary.com/v1_1/dlpiwweof/image/upload" , data)

      return response.data.url
  }