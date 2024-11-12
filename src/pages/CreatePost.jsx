import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const[errorMessage,setErrorMessage]=useState("")
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post("https://post-app-backend-7hpn.onrender.com/api/v1/postapp/addPost", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message||"something went wrong")
     
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
    {loading && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )}


    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2"
          required
        />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    </>
  );
}

export default CreatePost;
