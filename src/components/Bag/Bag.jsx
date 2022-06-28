import React from 'react';
import style from './Bag.module.css';
import { PureComponent } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import BagImages from './BagImages/BagImages';
import { NavLink } from 'react-router-dom';
const GetInfo = gql`
  query {
    category {
      products {
        id
        name
        description
        gallery
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
class Bag extends PureComponent {
  render() {
    let bag = [];
    let array = [];
    let pricesNum = 0;
    let total = 0;
    let totalGroup = '';

    for (let key in this.props.bag) {
      bag.push({ [key]: this.props.bag[key] });
    }
    if (this.props.data.loading === false) {
      let response = this.props.data.category.products;

      for (let i = 0; i < bag.length; i++) {
        for (let j = 0; j < response.length; j++) {
          if (bag[i][response[j].id]) {
            array.push(response[j]);
          }
        }
      }

      if (array.length > 0) {
        for (let i = 0; i < array[0].prices.length; i++) {
          if (array[0].prices[i].currency.label === this.props.currency.split(' ')[1]) {
            pricesNum = i;
          }
        }
      }
      array.map((i) =>
        bag.map((bag) =>
          bag[i.id] ? (total = total + i.prices[pricesNum].amount * bag[i.id]['count']) : '',
        ),
      );

      array.map((i) => (totalGroup = i.prices[pricesNum].currency.symbol + ' ' + total.toFixed(2)));
      return (
        <div className={style.modal_content}>
          {bag.length === 0 ? <div className={style.empty}>Your bag is empty</div> : <h1>CART</h1>}
          {array.map((i) => (
            <>
              <hr />
              <div className={style.bagItem}>
                <div className={style.text}>
                  <div className={style.mainText}>{i.brand}</div>
                  <NavLink to={`/item/${i.id}`}>
                    <div className={style.mainText}>{i.name}</div>
                  </NavLink>
                  <div className={style.mainText}>
                    <strong>
                      {i.prices[pricesNum].currency.symbol} {i.prices[pricesNum].amount}
                    </strong>
                  </div>
                  {i.attributes.map((item) => (
                    <>
                      <div className={style.mainText}>{item.name}:</div>
                      {item.type === 'text' ? (
                        <div className={style.textItemBox}>
                          {item.items.map((m) =>
                            bag.map((bag) =>
                              bag[i.id] ? (
                                <div
                                  onClick={() => this.props.addAttribute(i.id, item.id, m.id)}
                                  className={
                                    bag[i.id][item['id']] === m['id']
                                      ? `${style.textItem} ${style.textActive}`
                                      : style.textItem
                                  }>
                                  {m.value}
                                </div>
                              ) : (
                                ''
                              ),
                            ),
                          )}
                        </div>
                      ) : item.type === 'swatch' ? (
                        <div className={style.swatchItem}>
                          {item.items.map((m) =>
                            bag.map((bag) =>
                              bag[i.id] ? (
                                <div
                                  onClick={() => this.props.addAttribute(i.id, item.id, m.id)}
                                  className={
                                    bag[i.id][item['id']] === m.id
                                      ? `${style.pointer} ${m.id} on`
                                      : `${style.pointer} ${m.id}`
                                  }></div>
                              ) : (
                                ''
                              ),
                            ),
                          )}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
                  <div></div>
                </div>
                <div className={style.countContainer}>
                  <div onClick={() => this.props.increment(i.id)} className={style.plus}>
                    +
                  </div>
                  <div className={style.count}>
                    {bag.map((bag) => (bag[i.id] ? bag[i.id]['count'] : ''))}
                  </div>
                  {bag.map((bag) =>
                    bag[i.id] ? (
                      <div
                        onClick={() =>
                          bag[i.id]['count'] > 1
                            ? this.props.decrement(i.id)
                            : (bag[i.id]['count'] = 1 ? this.props.delete(i.id, bag) : '')
                        }
                        className={style.minus}>
                        -
                      </div>
                    ) : (
                      ''
                    ),
                  )}
                </div>
                <BagImages i={i} />
              </div>
            </>
          ))}
          {array.length > 0 ? (
            <>
              <hr />
              <div className={style.total}>
                Tax 21% : <strong>{(total * 0.21).toFixed(2)}</strong>
              </div>
              <div className={style.total}>
                Quantity : <strong>{this.props.totalCount}</strong>
              </div>
              <div className={style.total}>
                Total : <strong>{totalGroup}</strong>
              </div>
              <div>
                <button onClick={() => alert('Go to checkout')} className={style.btn}>
                  <div className={style.textBtn}>ORDER</div>
                </button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      );
    }
  }
}
export default graphql(GetInfo)(Bag);
