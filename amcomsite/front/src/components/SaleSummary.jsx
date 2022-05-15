import React from 'react'
import axios from 'axios';

export const SaleSummary = (props) => {

    const saveSale = () => {
        axios.post('http://127.0.0.1:8000/sales/',
            props.saleObj
        )
        .then((data)=>console.log(data))
    }
    
    const cleanSale = () => {
        props.setState(state => {
            return {
                ...state,
                saleObj: {
                    buyer: -1,
                    salesman: -1,
                    products: []
                },
                productsList: [],
                product:[],
                text: '',
                qtd: '',
            }
        })
    }

    const saleTotal = () => {
        return props.productsList.reduce((prev, item) => {
            return prev+=item.price*item.qtd
        },0)
    }

    let disabled = true
    if (props.saleObj.buyer > 0 && props.saleObj.salesman > 0 && props.saleObj.products.length > 0)
        disabled = false
    

  return (
    <>
        <div className='total'>
        <div>
            Valor total da venda
        </div>
        <div>
            R$ {saleTotal()}
        </div>
        </div>
        <div className='actions'>
              <button className='btn'
              onClick={cleanSale}
              >Cancelar</button>
              <button className='redbtn'
                  onClick={saveSale}
                  disabled={disabled}
              >Finalizar</button>
        </div>
    </>
  )
}
