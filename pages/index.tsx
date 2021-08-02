import styles from '../styles/Home.module.css'
import { client } from '../utils/Shopify-client'
import Link from 'next/link'
import { Heading, Link as link } from '@chakra-ui/layout'
import { Product } from '../types'
export default function Home({ products }: any) {
  console.log('PRODUCTS:', products)
  return (
    <div className={styles.container}>
      Hello
      {products.map(({ title, id }: Product) => {
        return (
          <div>
            <Link href={`/${title}`}>
              <Heading as='h1'>
                {title}
              </Heading>
            </Link>
          </div>
        )
      })
      }

    </div>

  )

}

export async function getServerSideProps() {

  const products = await client.product.fetchAll()
  return { props: { products: JSON.parse(JSON.stringify(products)) } }
}
