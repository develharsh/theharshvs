// import React from 'react'
import moment from "moment";

const Blogcard = ({ data }) => {
  const date = moment(data.createdAt).format("Do MMM YYYY").split(" ");
  return (
    <>
      {" "}
      <div className="flex" style={{ gap: "4rem" }}>
        <p style={{ color: "#888" }} className="blogcard-1div-1p">
          <span style={{ fontSize: "1.3rem" }}>{date[0]}</span>{" "}
          <span style={{ fontSize: "0.9rem" }}>{date[1]}</span>{" "}
          <span style={{ fontSize: "0.9rem" }}>{date[2]}</span>
        </p>
        <p>
          <a
            target={"_blank"}
            href={`/blog/${data.slug}`}
            style={{
              color: "darkblue",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            {data.topic}
          </a>
        </p>
      </div>
      <hr style={{ opacity: "0.2" }} />
    </>
  );
};

export default Blogcard;
