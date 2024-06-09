import React, { useState } from "react";
import service from "../../appwrite/config";
import { useEffect } from "react";
import { Postcard, Container } from "../index";
// import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

function Allposts() {
  const [Allpost, setAllposts] = useState([]);

  //   const getAllPost = async () => {
  //     const posts = await service.getPosts();
  //     setAllposts(posts.documents);
  //   };

  // const USER_ID = useSelector((state) => state.auth.userData.$id);

  const getAllPost = async (USER_ID) => {
    await service.AllgetPost(USER_ID).then((posts) => {
      if (posts) {
        setAllposts(posts.documents);
      }
    });
  };

  // const USER_ID = useSelector((state) => state.auth.userData.$id);
  const getuser = async () => {
    const userlogin = await authService.getCurrentUser();
    getAllPost(userlogin.$id);
    // return userlogin.$id;
    // console.log(userlogin);
  };

  useEffect(() => {
    // console.log(userlogin);
    getuser();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {Allpost.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
