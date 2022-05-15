import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ManageBar } from './ManageBar'
import { ProductList } from './ProductList'
import { SaleConfig } from './SaleConfig'
import { SaleSummary } from './SaleSummary'

export const Main = () => {
    const [state, setState] = useState({
        text: '',
        qtd: '',
        managedProds:[],
        productsList: [],
        buyers: [],
        salesman: [],
        saleObj: {
          products: [],
          buyer: -1,
          salesman: -1
        },
        product: {
          id: -1,
          qtd:-1
        }
      })
    
      useEffect(() => {
        axios.get('http://127.0.0.1:8000/products/')
          .then(resp => setState(state => {
            return {
              ...state,
              managedProds: resp.data
              }
          }))
        axios.get('http://127.0.0.1:8000/buyer/')
          .then(resp => setState(state => {
            return {
              ...state,
              buyers: resp.data
              }
          }))
        axios.get('http://127.0.0.1:8000/salesman/')
          .then(resp => setState(state => {
            return {
              ...state,
              salesman: resp.data
              }
          }))
      }, [])
    
      const setText = (value) => {
        setState(state => {
          return {
            ...state,
            text: value
          }
        })
      }
    
      const onFill = (value) => {
        setState(state => {
          const product = state.managedProds.filter(item => {
            return value === item.id
          })
          return {
            ...state,
            product: {
              ...product[0],
              qtd: state.qtd
            },
          }
        })
      }
    
      const addSelected = () => {
        setState(state => {
          return {
            ...state,
            productsList: [...state.productsList, state.product],
            saleObj: {
              ...state.saleObj,
              products: [
                ...state.saleObj.products,
                { product: state.product.id, qtd: state.product.qtd }
              ]
            }
          }
        })
      }
    
      const getOptions = () => {
        return state.managedProds.map(item => {
          return {id:item.id, label:item.product_name}
        })
      }
    
      const removeProduct = (idx) => {
        setState(state => {
          let copyList = [...state.productsList]
          copyList.splice(idx, 1)
          let copyListObj = [...state.saleObj.products]
          copyListObj.splice(idx, 1)
          return {
            ...state,
              productsList: copyList,
            saleObj: {
                ...state.saleObj,
                products:copyListObj
            }
          }
        })
      } 
  return (
    <main>
        <div className='left'>
          <h3>Produtos</h3>
          <ManageBar
            setState={setState}
            addSelected={addSelected}
            onFill={onFill}
            qtd={state.qtd}
            text={state.text}
            setText={setText}
            product={state.product}
            options={ getOptions() }/>
          <ProductList
            removeProduct={removeProduct}
            products={state.productsList} />
        </div>
        <div className='right'>
          <h3>Dados da venda</h3>
          <SaleConfig
          buyer_value={state.saleObj.buyer}
          salesman_value={state.saleObj.salesman}
          buyers={state.buyers}
            salesman={state.salesman}
            setState={setState}
          />
          <SaleSummary
                  saleObj={state.saleObj}
                  productsList={state.productsList}
            setState={setState}
          />
        </div>
      </main>
  )
}
