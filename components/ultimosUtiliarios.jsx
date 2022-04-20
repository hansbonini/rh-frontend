import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { Carousel, Image, Card, Button } from "react-bootstrap";

export default function UltimosUtilitarios() {
  const [loaded, setLoaded] = useState(false);
  const [utilitarios, setUtilitarios] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    if (!loaded) {
      const res = await fetch("https://romhackers.org/api/utilitarios.json");
      const json = await res.json();
      const ultima = json.slice(20, 4);

      setUtilitarios(ultima);
      setLoaded(true);
    }
  });

  return (
    <Card className="text-center mb-2">
      <Card.Header>Últimos Utilitários</Card.Header>
      <Card.Body>
        <Carousel indicators={false}>
          {utilitarios.map((item, i) => (
            <Carousel.Item key={i}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.excerpt}</Card.Text>
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
