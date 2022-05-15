import React from 'react'

export const SaleConfig = (props) => {

    const handleChange = (e) => {
        const name = e.target.name

        props.setState(state => {
            if(name==='salesman')
                return {
                    ...state,
                    saleObj: {
                        ...state.saleObj,
                        salesman: e.target.value
                    }
                }
            else
                return {
                    ...state,
                    saleObj: {
                        ...state.saleObj,
                        buyer: e.target.value
                    }
                }
        });
        }

  return (
    <div className='select_people_config'>
        <div className='form_group'>
        <label className='label' htmlFor="product_serach">Escolha um vendedor</label>
              <select value={props.salesman_value}
                    onChange={e => handleChange(e)}
                  name="salesman">
                  <option value={-1}>Selecione o vendedor</option>
                  {props.salesman.map((item, index) => {
                      return <option key={ index } value={item.id}>{item.name}</option>
                  })}
        </select>
        </div>
        <div className='form_group'>
        <label className='label' htmlFor="product_serach">Escolha um cliente</label>
            <select value={props.buyer_value}
                onChange={e => handleChange(e)}
                  name="buyer">
                  <option value={-1}>Selecione o cliente</option>
                {props.buyers.map((item, index) => {
                    return <option key={ index } value={item.id}>{item.name}</option>
                })}
        </select>
        </div>
    </div>
  )
}
