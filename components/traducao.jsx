import { Link, Image, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Traducao({ item }) {
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>{item.system}</Card.Header>
      <Card.Body>
        <Card.Title>{item.game_title}</Card.Title>
        <Card.Text>
          {(item.patch_images || [])?.length === 0 ? (
            ""
          ) : (
            <Image src={`${item.patch_images[0]}`} thumbnail />
          )}
        </Card.Text>
        <Button variant="primary" onClick={() => router.push(item.id)}>
          Visualizar
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        {typeof item.patch_author === "object" ? (
          item.patch_author.map((author) => <p>{author}</p>)
        ) : (
          <p>{item.patch_author}</p>
        )}
      </Card.Footer>
    </Card>
  );
}
