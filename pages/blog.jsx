import { useState, useEffect, useContext } from "react";
import { blogsGet, ACTIONS } from "../store/actions";
import { DataContext } from "../store/globalstate";
import Blogcard from "../components/custom/Blogcard";

const Blog = () => {
  const { dispatch } = useContext(DataContext);
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    if (!blogs) {
      dispatch({ type: ACTIONS.loading, payload: true });
      fetchBlogs(setBlogs);
    } else {
      dispatch({ type: ACTIONS.loading, payload: false });
    }
  }, [blogs]);

  return (
    <div className="blog-1div">
      {blogs?.map((each, idx) => (
        <Blogcard data={each} key={idx} />
      ))}
    </div>
  );
};

const fetchBlogs = async (setBlogs) => {
  const resp = await blogsGet();
  if (resp.success) setBlogs(resp.blogs);
};

export default Blog;
