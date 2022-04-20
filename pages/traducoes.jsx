import React, { useEffect, useRef, useState } from "react";
import LayoutPadrao from "../layouts/layoutPadrao";
import Traducao from "../components/traducao";
import { Container, Row, Col, Form } from "react-bootstrap";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Traducoes({ traducoes }) {
  const [searchingState, setSearchingState] = useState(false);
  const [countTraducoes, setCountTraducoes] = useState(10);
  const [queryTraducoes, setQueryTraducoes] = useState(traducoes);
  const loaderRef = useRef();
  const observer = useRef();

  const handlePesquisa = (query) => {
    if (query !== "") {
      setQueryTraducoes(
        traducoes.filter((item) =>
          Object.values(item).some((val) =>
            val ? val.toString().toLowerCase().includes(query.toLowerCase()) : false
          )
        )
      );
      setCountTraducoes(10);
      return;
    }
    setQueryTraducoes(traducoes);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "10px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        let currentCount = countTraducoes;
        setCountTraducoes(currentCount + 10);
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
              {queryTraducoes.slice(0, countTraducoes).map((item) => (
                <Traducao key={item.id} item={item}></Traducao>
              ))}
            </Masonry>
            <div ref={loaderRef}></div>
          </Container>
        </Row>
      </Container>
    </>
  );
}

Traducoes.getLayout = function getLayout(page) {
  return <LayoutPadrao>{page}</LayoutPadrao>;
};

export async function getStaticProps() {
  const res = await fetch("https://romhackers.org/api/traducoes.json");
  const json = await res.json();

  return {
    props: {
      traducoes: json,
    },
  };
}
