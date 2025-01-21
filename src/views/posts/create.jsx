import React from "react";
import { useState } from "react";
import Api from "../../api";
import { useNavigate } from "react-router-dom";
const PostCreate = () => {
  // Definisikan  state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // validasi error
  const [errors, setErrors] = useState([]);
  //useNavigate
  const navigate = useNavigate();

  //   Masukan file kedalam state image
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //  Memasukan data atau method store
  const storePost = async (e) => {
    e.preventDefault();

    // untuk mengirimkan gambar ke server
    // init form data
    const formData = new FormData();

    // masukin data yang ada di state ke form data
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);

    // Mengirim data dengan axios  menggunakan method posts
    // send data with api
    await Api.post('/api/posts', formData)
        .then(() => {
            // kembali ke post index
            navigate('/posts')
        })
        .catch(error => {
            setErrors(error.response.data)
        })
  }

  return (
    <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                         <form action="" onSubmit={storePost}>
                            {/* Image */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label fw-bold">Image</label>
                                <input type="file" onChange={handleFileChange} className="form-control" />
                                {
                                    errors.image && (
                                        <div className="alert alert-danger mt-2">{errors.image[0]}</div>
                                    )
                                }
                            </div>
                            {/* Title */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label fw-bold">Title</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)}  placeholder="Title Post"/>
                                {
                                    errors.title && (
                                        <div className="alert alert-danger mt-2">{errors.title[0]}</div>
                                    )
                                }
                            </div>
                            {/* Content */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label fw-bold">Content</label> 
                                <textarea name="" id="" className="form-control" onChange={(e) => setContent(e.target.value)} placeholder="Content Post"></textarea>
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

export default PostCreate;
