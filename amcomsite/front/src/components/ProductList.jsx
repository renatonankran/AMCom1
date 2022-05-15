import React from 'react'

export const ProductList = (props) => {
  return (
      <table className='product_list'>
          <thead>
            <tr>
              <th className='first_item'>Produto/Serviço</th>
              <th>Quantidade</th>
              <th>Preço unitário</th>
              <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {props.products.map((item, idx) => {
              return (
                    <tr key={idx}>
                    <td className='first_item'>{item.product_name}</td>
                    <td>{item.qtd}</td>
                    <td>R$ {item.price}</td>
                    <td>R$ {item.price*parseInt(item.qtd)}</td>
                  <td><span
                    onClick={()=>props.removeProduct(idx)}
                    className="material-symbols-outlined">
                        delete_forever
                        </span></td>
                    </tr>
              )
            })}
            </tbody>
          </table>
  )
}
