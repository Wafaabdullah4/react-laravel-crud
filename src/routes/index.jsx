import { Routes, Route } from "react-router-dom"

// Import untuk Home page nya
import Home from "../views/home";
// import view posts index ;
import PostIndex from "../views/posts";
// import view create  ; 
import PostCreate from "../views/posts/create";
// import view  edit
import PostEdit from "../views/posts/edit";

const RoutesIndex = () => {
    return (
        <Routes>
            {/* Untuk home */}
            <Route path="/" element={<Home /> } />
            {/* untuk post index */}
            <Route path="/posts" element={<PostIndex/>} />
            {/* untuk post create */}
            <Route path="/posts/create" element={<PostCreate/>} />
            {/* untuk post edit */}
            <Route path="/posts/edit/:id" element={<PostEdit/>} />
        </Routes>
    )
}

export default RoutesIndex