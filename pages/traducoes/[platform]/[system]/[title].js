import { useRouter } from "next/router";
import { Container, Row, Col, Card, Alert, Table, Image, Button, Link } from 'react-bootstrap'
import parse from 'html-react-parser';
import LayoutPadrao from "../../../../layouts/layoutPadrao";
import Setup from '../../../../config/setup';

const Traducao = ({ traducoes }) => {
    const router = useRouter();
    const { pathname, query } = router;

    const getDownloadLink = (value) => router.push(value);

    return (
        <>
            {traducoes
                .filter(
                    (item) =>
                        item.id.includes(query.title) && item.id.includes(query.system)
                )
                .map((item) => (
                    <Card className="text-center">
                        <Card.Header><h4>{item.game_title}</h4></Card.Header>
                        <Card.Body>
                            <Container>
                                <Row className="py-4">

                                    {
                                        (item.patch_images || [])?.length === 0 ? '' : item.patch_images.map((img) => (
                                            <Col><Image src={`${img}`} thumbnail /></Col>
                                        ))
                                    }

                                </Row>
                                <Row className="py-4">
                                    <Col>
                                        <Alert variant="secondary">
                                            <p>
                                                {parse(item.content)}
                                            </p>
                                        </Alert>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table striped bordered>
                                            <thead className="bg-primary text-light">
                                                <tr>
                                                    <td colspan="2">Informações do Jogo</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Plataforma</td>
                                                    <td>{item.platform}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sistema</td>
                                                    <td>{item.system}</td>
                                                </tr>
                                                <tr>
                                                    <td>Genero</td>
                                                    <td>{item.platform}</td>
                                                </tr>
                                                <tr>
                                                    <td>Jogadores</td>
                                                    <td>{item.game_players}</td>
                                                </tr>
                                                <tr>
                                                    <td>Desenvolvedora</td>
                                                    <td>{item.game_developer}</td>
                                                </tr>
                                                <tr>
                                                    <td>Distribuidora</td>
                                                    <td>{item.game_publisher}</td>
                                                </tr>
                                                <tr>
                                                    <td>Data de Lançamento</td>
                                                    <td>{item.game_release_date}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col>
                                        <Table striped bordered>
                                            <thead className="bg-primary text-light">
                                                <tr>
                                                    <td colspan="2">Informações do Patch</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Autor(es)</td>
                                                    <td>{
                                                        typeof (item.patch_author) === 'object' ? item.patch_author.map(
                                                            (author) => (
                                                                <p>{author}</p>
                                                            )) : (<p>{item.patch_author}</p>)
                                                    }</td>
                                                </tr>
                                                <tr>
                                                    <td>Grupo(s)</td>
                                                    <td>{
                                                        typeof (item.patch_group) === 'object' ? item.patch_group.map(
                                                            (author) => (
                                                                <p>{author}</p>
                                                            )) : (<p>{item.patch_group}</p>)
                                                    }</td>
                                                </tr>
                                                <tr>
                                                    <td>Site</td>
                                                    <td>{item.patch_site}</td>
                                                </tr>
                                                <tr>
                                                    <td>Versão</td>
                                                    <td>{item.patch_version}</td>
                                                </tr>
                                                <tr>
                                                    <td>Data de Lançamento</td>
                                                    <td>{item.patch_release}</td>
                                                </tr>
                                                <tr>
                                                    <td>Formato</td>
                                                    <td>{item.patch_type}</td>
                                                </tr>
                                                <tr>
                                                    <td>Progresso</td>
                                                    <td>{item.patch_progress}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Container>
                                <Row>
                                    <Col xs={12} lg size="lg" className="d-grid my-2">
                                        <Button variant={item.patch_file ? 'primary' : 'muted'} disabled={item.patch_file ? false : true} onClick={() => item.patch_file ? getDownloadLink(item.patch_file.includes('//') ? item.patch_file : `${Setup.CDN_URL}/traducoes/${encodeURIComponent(item.patch_file)}`) : false}>Download</Button>
                                    </Col>
                                    <Col xs={12} lg size="lg" className="d-grid my-2">
                                        <Button>Link Permanente</Button>
                                    </Col>
                                    <Col xs={12} lg size="lg" className="d-grid my-2">
                                        <Button variant="muted">Aplicar Patch</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Footer>
                    </Card>
                ))}
        </>
    );
};

export default Traducao;

Traducao.getLayout = function getLayout(page) {
    return <LayoutPadrao>{page}</LayoutPadrao>;
};

export async function getStaticPaths() {
    const res = await fetch("https://romhackers.org/api/traducoes.json");
    const json = await res.json();
    const paths = json.map((item) => ({
        params: {
            platform: item.id.split("/")[2],
            system: item.id.split("/")[3],
            title: item.id.split("/")[4],
        },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch("https://romhackers.org/api/traducoes.json");
    const json = await res.json();
    const traducoes = { traducoes: json };

    return { props: traducoes };
}
