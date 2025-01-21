import React from "react";
import { useState, useEffect } from "react";
import Api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const PostEdit = () => {
  // Definisikan  state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // validasi error
  const [errors, setErrors] = useState([]);
  //useNavigate
  const navigate = useNavigate();

  // ambil parameter id di browser
  const { id } = useParams();

  // Buat method untuk mengambil data sesuai id
  const fetchDetailPost = async () => {
    await Api.get(`/api/posts/${id}`).then((response) => {
      // assign to state
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  // Hook useeffe
  useEffect(() => {
    // panggil method fetchdetailpost
    fetchDetailPost();
  }, []);

  // method handlefile
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Method update posts
  const updatePost = async (e) => {
    e.preventDefault();

    // init form data
    const formData = new FormData();

    // append data masukin data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    // Mengirim data dengan axios  menggunakan method posts
    // send data with api
    await Api.post(`/api/posts/${id}`, formData)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };
  return (
    <div className="container mt-5">
    <div className="row">
        <div className="col-md-12">
            <div className="card border-0 rounded shadow">
                <div className="card-body">
                 <form action="" onSubmit={updatePost}>
                    {/* Image */}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">Image</label>
                        <input type="file" onChange={handleFileChange}  className="form-control" />
                        {
                            errors.image && (
                                <div className="alert alert-danger mt-2">{errors.image[0]}</div>
                            )
                        }
                    </div>
                    {/* Title */}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="Title Post"/>
                        {
                            errors.title && (
                                <div className="alert alert-danger mt-2">{errors.title[0]}</div>
                            )
                        }
                    </div>
                    {/* Content */}
                    <div className="mb-3">
                        <label htmlFor="" className="form-label fw-bold">Content</label> 
                        <textarea name="" id="" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content Post"></textarea>
                        {
                            errors.content && (
                                <div className="alert alert-danger mt-2">{errors.content[0]}</div>
                            )
                        }
                    </div>

                    <button className="btn btn-primary btn-md rounded-sm shadow border-0">Save</button>
                 </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default PostEdit;
