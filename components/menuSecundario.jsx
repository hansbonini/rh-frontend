import { Nav } from 'react-bootstrap'

export default function MenuSecundario({menu}) {
    return (
        <Nav className="secondary-menu justify-content-center bg-primary py-2 d-none d-lg-flex">
            {
                menu.map((item, i) => (
                    <Nav.Link color="light" key={i} href={item.url}>{item.title}</Nav.Link>
                ))
            }
        </Nav>
    )
}