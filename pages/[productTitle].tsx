import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { client } from '../utils/Shopify-client'

export default function ProductPage() {
  const router = useRouter()
  const { productTitle } = router.query

  return (
    <div>
      Page: {productTitle}
    </div>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll()
  return { props: { products: JSON.parse(JSON.stringify(products)) } }
}
