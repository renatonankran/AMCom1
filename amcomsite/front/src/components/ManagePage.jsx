import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



export const ManagePage = (props) => {

    const [state, setState] = useState({
        buyer: '',
        salesman: '',
        product_name: '',
        commission: 0,
        price: 0,
        begin: '',
        end: '',
        salesman_value: -1,
        salesmanList:[]
    })

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/salesman/')
          .then(resp => setState(state => {
            return {
              ...state,
              salesmanList: resp.data
              }
          }))
    }, [])
    


    const onChange = (e) => {
        const value = e.target.value
        setState(state => {
            if (e.target.name === 'begin') {   
                return {
                    ...state,
                    begin:value
                }
            }
            if (e.target.name === 'end') {   
                return {
                    ...state,
                    end:value
                }
            }
            if(e.target.name === 'buyer')
                return {
                    ...state,
                    buyer: value
                }
            if(e.target.name === 'salesman')
                return {
                    ...state,
                    salesman: value
                }
            if(e.target.name === 'product_name')
                return {
                    ...state,
                    product_name: value
                }
            if(e.target.name === 'commission')
                return {
                    ...state,
                    commission: value
                }
            if(e.target.name === 'price')
                return {
                    ...state,
                    price: value
                }
            if(e.target.name === 'salesman_s')
                return {
                    ...state,
                    salesman_value: value
                }
            return state
        })
    }

    const saveBuyer = () => {
        axios.post('http://127.0.0.1:8000/buyer/', { name: state.buyer })
        .then(data => console.log(data))
    }
    const saveSalesman = () => {
        axios.post('http://127.0.0.1:8000/salesman/', { name: state.salesman })
        .then(data => console.log(data))
    }
    const saveProduct = () => {
        axios.post('http://127.0.0.1:8000/products/',
        {
            product_name: state.product_name,
            commission: state.commission,
            price: state.price
            })
            .then(data => console.log(data))
    }

    const consultCommission = () => {
        axios.post('http://127.0.0.1:8000/commission/',
        {
            salesman:state.salesman_value,
            begin:state.begin,
            end:state.end
        })
            .then(data => setState(state => {
                return {
                    ...state,
                    commission_result: data.data.commission
            }
        }))
    }

    let product = true
    if (state.product_name.length > 0 &&
        state.commission >= 0 &&
        state.price >= 0)
        product = false
    
  return (
      <div>
          <div className='form_group'>
            <label className='label' htmlFor="buyer">Cadastrar cliente</label>
            <label className='label' htmlFor="buyer">Nome</label>
              <input
                  value={state.buyer}
                  onChange={e => onChange(e)}
                className='add_input' name="buyer" type='text' />
            </div>
          <button className='btnadd'
              onClick={saveBuyer}
              disabled={state.buyer.length > 0 ? false : true}
          >Adicionar</button>
          <div className='form_group'>
            <label className='label' htmlFor="salesman">Cadastrar vendedor</label>
            <label className='label' htmlFor="salesman">Nome</label>
              <input
                  value={state.salesman}
                  onChange={e => onChange(e)}
                className='add_input' name="salesman" type='text' />
            </div>
          <button className='btnadd'
              onClick={saveSalesman}
              disabled={state.salesman.length > 0 ? false : true}
          >Adicionar</button>
          <div className='form_group'>
            <label className='label' htmlFor="product_name">Cadastrar produto</label>
            <label className='label' htmlFor="product_name">Nome do produto</label>
              <input
                  value={state.product_name}
                  onChange={e => onChange(e)}
                className='add_input' name="product_name" type='text' />
            </div>

          <div className='form_group'>
            <label className='label' htmlFor="commission">Comissão</label>
              <input
                  value={state.commission}
                  onChange={e => onChange(e)}
                className='add_input' name="commission" type='number' />
            </div>
          <div className='form_group'>
            <label className='label' htmlFor="price">Preço</label>
              <input
                  value={state.price}
                  onChange={e => onChange(e)}
                className='add_input' name="price" type='number' />
            </div>
            <button className='btnadd'
                onClick={saveProduct}
                disabled={product}
            >Adicionar</button>
          <div className='form_group'>
            <label className='label' htmlFor="begin">Consultar comissão</label>
            <label className='label' htmlFor="begin">Começo do intervalo</label>
              <input type="datetime-local"
                  className='add_input'
                  onChange={e => onChange(e)}
                name="begin" value={state.begin}/>
            </div>
          <div className='form_group'>
            <label className='label' htmlFor="end">Fim do intervalo</label>
            <input type="datetime-local"
                  className='add_input'
                  onChange={e => onChange(e)}
                name="end" value={state.end}/>
          </div>
          <div className='form_group'>
        <label className='label' htmlFor="product_serach">Escolha um vendedor</label>
              <select value={state.salesman_value}
                  className='add_input'
                    onChange={e => onChange(e)}
                  name="salesman_s">
                  <option value={-1}>Selecione o vendedor</option>
                  {state.salesmanList.map((item, index) => {
                      return <option key={ index } value={item.id}>{item.name}</option>
                  })}
        </select>
        </div>
          <button className='btnadd'
              onClick={consultCommission}
          >Consultar comissão</button>
          {state.commission_result && <div>Comissão: R$ { state.commission_result }</div>}
    </div>
  )
}
