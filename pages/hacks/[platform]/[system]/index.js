import React, { useEffect, useRef, useState } from "react";
import LayoutPadrao from "../../../../layouts/layoutPadrao";
import Hack from "../../../../components/hack";
import { Container, Row, Col, Form } from "react-bootstrap";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Hacks({ hacks }) {
  const [searchingState, setSearchingState] = useState(false);
  const [countHacks, setCountHacks] = useState(10);
  const [queryHacks, setQueryHacks] = useState(hacks);
  const loaderRef = useRef();
  const observer = useRef();

  const handlePesquisa = (query) => {
    if (query !== "") {
      setQueryHacks(
        hacks.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(query.toLowerCase())
          )
        )
      );
      setCountHacks(10);
      return;
    }
    setQueryHacks(hacks);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "10px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        let currentCount = countHacks;
        setCountHacks(currentCount + 10);
      }
    };
    observer.current = new IntersectionObserver(callback, options);
    if (loaderRef.current) observer.current.observe(loaderRef.current);
    return () => {
      observer.current.disconnect();
    };
  });

  return (
    <>
      <Container>
        <Row>
          <Col xs="12">
            <Form.Control
              type="text"
              id="inlineSearch"
              placeholder="Digite aqui o nome do jogo, plataforma ou autor que deseja encontrar..."
              onChange={(event) => {
                handlePesquisa(event.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Container>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column py-5"
            >
              {queryHacks.slice(0, countHacks).map((item) => (
                <Hack key={item.id} item={item}></Hack>
              ))}
            </Masonry>
            <div ref={loaderRef}></div>
          </Container>
        </Row>
      </Container>
    </>
  );
}

Hacks.getLayout = function getLayout(page) {
  return <LayoutPadrao>{page}</LayoutPadrao>;
};


export async function getStaticPaths() {
    const res = await fetch("https://romhackers.org/api/romhacks.json");
    const json = await res.json();
    const paths = json.map((item) => ({
        params: {
            platform: item.id.split("/")[2],
            system: item.id.split("/")[3],
        },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const res = await fetch("https://romhackers.org/api/romhacks.json");
  const json = await res.json();
  const filtered = json.filter((item) => item.id.includes(`/romhacks/${params.platform}/${params.system}`))

  return {
    props: {
      hacks: filtered,
    },
  };
}
