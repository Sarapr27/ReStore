import React from 'react'
import { fetchSearch } from '../home/fetch'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { Navbar } from '../components/navbar/navbar'
import NotFound from '../home/[category]/[productId]/notFound'

async function Search({ searchParams }) {
  const data = await fetchSearch(searchParams.search)
  console.log(data.result.length)
  console.log(data.result)
  const filteredData = data.result.filter(product => product.Disabled !== true)
  data.result = filteredData
  const ubicaciones = data.result.map(producto => producto.Ubicacion)
  const marcas = data.result.map(producto => producto.Marca)
  const estado = data.result.map(producto => producto.state)
  console.log(data.result.length)
  if (data.length === 0) return  <NotFound></NotFound>
  return (
    <div>
      <Navbar></Navbar>
      <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado} />
    </div>
  )
}

export default Search