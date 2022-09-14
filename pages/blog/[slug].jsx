// import React from "react";
import axios from "axios";
import { TypographyStylesProvider } from "@mantine/core";

const BlogSpecific = ({ blog }) => {
  return (
    <div>
      <h1>{blog?.topic}</h1>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </TypographyStylesProvider>
    </div>
  );
};

export async function getServerSideProps(context) {
  // const { req, res } = context;
  const { slug } = context.query;
  let resp = await axios({
      method: "GET",
      url: `${process.env.baseUrl}/v1/blog/get-by-slug/${slug}`,
    }),
    blog;
  if (!resp.data.success)
    blog = { tags: [], topic: "No Such Blog Exists", content: "" };
  else blog = resp.data.blog;
  return { props: { blog } };
}

export default BlogSpecific;
