import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { Carousel, Card, Button } from "react-bootstrap";

export default function UltimasForum() {
  const [loaded, setLoaded] = useState(false);
  const [postagens, setPostagens] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    if (!loaded) {
      const res = await fetch("https://api.allorigins.win/get?url=http%3A//www.romhacking.net.br/index.php%3Ftype%3Drss%3Baction%3D.xml");
      const xml = await res.json();
      //const xmlParsed = new XMLParser().parseFromString(xml) 
      const ultima = [];

      //console.log(xmlParsed);
      setPostagens(ultima);
      setLoaded(true);
    }
  });

  return (
    <Card className="text-center mb-2">
      <Card.Header>Últimas do Fórum</Card.Header>
      <Card.Body>
        <Carousel indicators={false}>
          {postagens.map((item, i) => (
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
