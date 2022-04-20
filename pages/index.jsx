import LayoutPadrao from '../layouts/layoutPadrao'
import Noticia from '../components/noticia'

export default function Index({ news }) {
  return (
    <>
      {news.map((item) => (
        <Noticia key={item.id} item={item}></Noticia>
      ))
      }
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <LayoutPadrao>
      {page}
    </LayoutPadrao>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://romhackers.org/api/noticias.json')
  const json = await res.json()

  return {
    props: {
      news: json.reverse()
    }
  }
}