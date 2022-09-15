// import React from "react";
import axios from "axios";
import { TypographyStylesProvider, Badge } from "@mantine/core";
import moment from "moment";
import Seo from "../../components/seo";
import Link from "next/link";

const BlogSpecific = ({ blog }) => {
  return (
    <>
      <Seo title={`${blog.topic} - Harshvardhan Singh's personal homepage`} />
      <div className="blogslug-1div">
        <p>
          <span>{blog.topic}</span>
          <br />
          {blog.createdAt && (
            <span>{moment(blog.createdAt).format("Do MMM YYYY")}</span>
          )}
        </p>
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="blogslug-2div"
          />
        </TypographyStylesProvider>
        <div style={{ marginBottom: "1.3rem" }}>
          {blog.tags.map((each, idx) => (
            <Link href={`/blog?tag=${each}`} key={idx}>
              <a className="no-txt-decor">
                <Badge
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  sx={{ marginRight: "0.5rem", cursor: "pointer" }}
                >
                  {each}
                </Badge>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // const { req, res } = context;
  const { slug } = context.query;
  let blog;
  try {
    let resp = await axios({
      method: "GET",
      url: `${process.env.baseUrl}/v1/blog/get-by-slug/${slug}`,
    });
    blog = resp.data.blog;
  } catch (err) {
    blog = { tags: [], topic: "No Such Blog Exists", content: "" };
  }
  return { props: { blog } };
}

export default BlogSpecific;
