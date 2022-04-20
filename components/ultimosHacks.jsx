import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { Carousel, Image, Card, Button } from "react-bootstrap";

export default function UltimosHacks() {
  const [loaded, setLoaded] = useState(false);
  const [hacks, setHacks] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    if (!loaded) {
      const res = await fetch("https://romhackers.org/api/romhacks.json");
      const json = await res.json();
      const ultima = json.slice(0, 4);

      setHacks(ultima);
      setLoaded(true);
    }
  });

  return (
    <Card className="text-center mb-2">
      <Card.Header>Últimos Hacks</Card.Header>
      <Card.Body>
        <Carousel indicators={false}>
          {hacks.map((item, i) => (
            <Carousel.Item key={i}>
              {(item.patch_images || [])?.length === 0
                ? ""
                : item.patch_images
                    .slice(0, 1)
                    .map((img) => <Image src={`https:${img}`} thumbnail />)}
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
