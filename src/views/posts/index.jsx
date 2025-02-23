import Api from "../../api";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const PostIndex = () => {
    const [posts, setPosts] = useState([]);

    const fetchDataPosts = async () => {
        await Api.get("/api/posts").then((response) => {
            setPosts(response.data.data.data);
        });
    };

    // run hook
    useEffect(() => {
        // panggil method fetchdataposts
        fetchDataPosts();
    }, []);

    // method untuk delete
    const deletePost = async (id) => {
        await Api.delete(`/api/posts/${id}`)
        .then(() => {
            // Panggil data posts
            fetchDataPosts();
        })
    }
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link
                        to="/posts/create"
                        className="btn btn-md btn-success rounded shadow border-0 mb-3"
                    >
                        ADD NEW POST
                    </Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Content</th>
                                        <th scope="col" style={{ width: "15%" }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length > 0 ? (
                                        posts.map((post, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        width="200"
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td>{post.title}</td>
                                                <td>{post.content}</td>
                                                <td className="text-center">
                                                    <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                    <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                <div className="alert alert-danger mb-0">
                                                    Data Belum Tersedia!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostIndex;
