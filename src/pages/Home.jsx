import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

   
  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://post-app-backend-7hpn.onrender.com/api/v1/postapp/getPosts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
 
  const handleEdit = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  // Handle updating the post
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedPost) {
      setIsLoading(true); // Start loading
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("id", selectedPost._id);
        if (image) formData.append("image", image);

        await axios.put("https://post-app-backend-7hpn.onrender.com/api/v1/postapp/updatePost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await fetchPosts(); // Refresh the posts
        setEditModalOpen(false);
      } catch (error) {
        console.error("Error updating post", error);
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  const handleDelete = (postId) => {
    const post = posts.find((post) => post._id === postId);
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPost) {
      setIsLoading(true); // Start loading
      const id = selectedPost._id;
      try {
        await axios.delete(`https://post-app-backend-7hpn.onrender.com/api/v1/postapp/deletePost/${id}`);
        await fetchPosts(); // Refresh the posts
        setDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting post", error);
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://post-app-backend-7hpn.onrender.com/${post.imageUrl}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>

                <div className="flex mt-4 space-x-4">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            {isLoading ? (
              <div className="text-center text-blue-500">Loading...</div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">Edit Post</h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Title"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Description"
                />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2" />

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            {isLoading ? (
              <div className="text-center text-red-500">Loading...</div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">Delete Post</h2>
                <p>Are you sure you want to delete this post?</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
