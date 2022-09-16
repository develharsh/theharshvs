import { useState, useEffect, useContext } from "react";
import { blogsGet, ACTIONS } from "../store/actions";
import { DataContext } from "../store/globalstate";
import Blogcard from "../components/custom/Blogcard";
import Seo from "../components/seo";
import { Pagination } from "@mantine/core";
import { useRouter } from "next/router";

const Blog = ({ tag, page }) => {
  const router = useRouter();
  const { dispatch } = useContext(DataContext);
  const [blogs, setBlogs] = useState(null);
  const [activePage, setPage] = useState(page);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    // alert(activePage);
    fetchBlogs(setBlogs, setNoOfPages, dispatch, tag, activePage);
    router.push(`/blog?page=${activePage}&tag=${!tag ? "" : tag}`);
  }, [activePage]);

  return (
    <>
      <Seo title="Musing &amp; Blog - Harshvardhan Singh" />
      <div className="blog-1div">
        {tag && <p>{tag}</p>}
        {blogs?.map((each, idx) => (
          <Blogcard data={each} key={idx} />
        ))}
        <div className="flex justifycenter">
          <Pagination page={activePage} onChange={setPage} total={noOfPages} />
        </div>
      </div>
    </>
  );
};

const fetchBlogs = async (
  setBlogs,
  setNoOfPages,
  dispatch,
  tag,
  activePage
) => {
  dispatch({ type: ACTIONS.loading, payload: true });
  const resp = await blogsGet(tag, activePage);
  if (resp.success) {
    setBlogs(resp.blogs);
    setNoOfPages(resp.noOfPages);
  }
  dispatch({ type: ACTIONS.loading, payload: false });
};

export async function getServerSideProps(context) {
  // const { req, res } = context;
  let { tag, page } = context.query;
  if (!tag) tag = null;
  if (!page) page = 1;
  return { props: { tag, page } };
}

export default Blog;
