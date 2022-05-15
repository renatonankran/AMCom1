import React from 'react'
import { Hint } from 'react-autocomplete-hint';



export const ManageBar = (props) => {

    const changeQtd = (value) => {
        props.setState(state => {
            return {
                ...state,
                qtd: value,
                product: {
                    ...state.product,
                    qtd: value
                }
            }
        })
    }
    let disabled =true
    if(props.product.id>0 && props.product.qtd>0)
        disabled =false
  return (
    <div className='manage_bar'>
            <div className='form_group'>
              <label className='label' htmlFor="product_serach">Buscar pelo código de barras ou descrição</label>
              <Hint options={props.options} 
                  onFill={value => props.onFill(value.id)}>
                  <input
                    className='product_search'
                    value={props.text}
                    onChange={e => props.setText(e.target.value)} />
                </Hint>
            </div>
            <div className='form_group'>
            <label className='label' htmlFor="product_qtd">Quantidade de itens</label>
              <input
                  value={props.qtd}
                  onChange={e => changeQtd(e.target.value)}
                className='product_qtd' name="product_qtd" type='number' />
            </div>
          <button className='btn'
              onClick={props.addSelected}
              disabled={disabled}
          >Adicionar</button>
          </div>
  )
}
