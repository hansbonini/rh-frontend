import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { Carousel, Image, Card, Button } from "react-bootstrap";

export default function UltimasTraducoes() {
  const [loaded, setLoaded] = useState(false);
  const [traducoes, setTraducoes] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    if (!loaded) {
      const res = await fetch("https://romhackers.org/api/traducoes.json");
      const json = await res.json();
      const ultima = json.slice(0, 4);

      setTraducoes(ultima);
      setLoaded(true);
    }
  });

  return (
    <Card className="text-center mb-2">
      <Card.Header>Últimas Traduções</Card.Header>
      <Card.Body>
        <Carousel indicators={false}>
          {traducoes.map((item, i) => (
            <Carousel.Item key={i}>
              {(item.patch_images || [])?.length === 0
                ? ""
                : item.patch_images
                    .slice(0, 1)
                    .map((img, j) => <Image key={j} src={`https:${img}`} thumbnail />)}
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.system}</Card.Text>
              <Button variant="primary" onClick={() => router.push(item.id)}>
                Visualizar
              </Button>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
}
