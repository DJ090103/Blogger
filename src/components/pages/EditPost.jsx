import { useEffect, useState } from "react";
import service from "../../appwrite/config";
import Container from "../container/Container";
import { PostForm } from "../index";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setpost] = useState();

  const slug = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setpost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
