export default function AddProduct() {
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
  
    const handleImageChange = (e) => {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    };
  
    const handleUpload = async () => {
      const uploadPromises = images.map((image) => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        return uploadBytes(imgRef, image)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .catch((error) => {
            console.log("Error uploading image:", error);
            throw error;
          });
      });
  
      try {
        const urls = await Promise.all(uploadPromises);
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
      } catch (error) {
        console.log("Error uploading images:", error);
      }
    };
  console.log('--------------------------------');
  console.log(imageUrls);
    return (
      <div className="App">
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        
      </div>
    );
  }