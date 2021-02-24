import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store'
import { getProducts } from '../store/products/actions'

const Products: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const products = useSelector((state: AppState) => state.products.products)

  return (
    <div>
      <h2>Products</h2>
    </div>
  )
}

export default Products
