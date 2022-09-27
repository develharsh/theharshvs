// import React from 'react'
import moment from "moment";
import Link from "next/link";
import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Blogcard = ({ data }) => {
  const date = moment(data.createdAt).format("Do MMM YYYY").split(" ");
  const isDesk = useMediaQuery("(min-width: 80rem)");
  const isTab = useMediaQuery("(min-width: 40rem)");
  return (
    <>
      <Grid>
        <Grid.Col
          span={isDesk ? 3 : isTab ? 3 : 5}
          // style={{ background: isDesk ? "blue" : isTab ? "red" : "green" }}
        >
          <p style={{ color: "#888" }}>
            <span style={{ fontSize: "1.3rem" }}>{date[0]}</span>{" "}
            <span style={{ fontSize: "0.9rem" }}>{date[1]}</span>{" "}
            <span style={{ fontSize: "0.9rem" }}>{date[2]}</span>
          </p>
        </Grid.Col>

        <Grid.Col
          span={isDesk ? 9 : isTab ? 9 : 7}
          // style={{ background: isDesk ? "green" : isTab ? "blue" : "red" }}
        >
          <p>
            <a
              href={`/blog/${data.slug}`}
              // target={"_blank"}
              style={{
                color: "darkblue",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              {data.topic}
            </a>
          </p>
        </Grid.Col>
      </Grid>

      <hr style={{ opacity: "0.2" }} />
    </>
  );
};

export default Blogcard;
