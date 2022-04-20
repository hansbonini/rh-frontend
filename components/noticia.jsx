import Link from "next/link";
import Moment from "react-moment";
import parse from "html-react-parser";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CommentCount } from "disqus-react";

export default function Noticia({ item }) {
  const identifier = item.slug.replaceAll("-", "_");

  return (
    <Card className="text-center mb-4">
      <Card.Header>
        <h4>{item.title}</h4>
        <small className="bg-secondary text-light">
          <span>Enviado em </span>
          <Moment format="DD/MM/YYYY" locale="pt-br">
            {item.date}
          </Moment>
          <span> às </span>
          <Moment format="HH:mm:ss" locale="pt-br">
            {item.date}
          </Moment>
          <span> por </span>
          <Link href="">{item.author}</Link>
        </small>
      </Card.Header>
      <Card.Body>
        <Card.Text>{parse(item.content)}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Container>
          <Row>
            <Col>
              <Link href={item.url}>Link Permanente</Link>
            </Col>
            <Col>
              <Link
                href={`https://disqus.com/home/discussion/romhackersorg/${identifier}`}
              >
                <CommentCount
                  shortname="romhackersorg"
                  config={{
                    url: `https://romhackers.org${item.url}`,
                  }}
                >
                  Comentários
                </CommentCount>
              </Link>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
