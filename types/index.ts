export type Product = {
    title: string
    body: string
    id: string
    description: string
    vendor: string
    images: Img[]
    variants: Variants[]

}

export type Img = {
  src: string,
  id: string
}

export type Variants = {
  available: boolean 
  compareAtPrice: string
  price: string
  selectedOptions: SelectedOptions[]
  image: Image
  id: string
}
export type Image = {
  src: string
  id: string
  altText: string
  }

export type SelectedOptions = {
name: string
value: string
}