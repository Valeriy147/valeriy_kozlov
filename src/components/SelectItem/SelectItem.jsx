import React from 'react';
import style from './SelectItem.module.css';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import './SelectedItem.css';

const GetInfo = gql`
  query {
    category {
      products {
        id
        name
        inStock
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
class SelectItem extends React.Component {
  componentWillUnmount() {
    this.props.setBigPhoto('');
    this.props.cleanAttributes();
  }

  render() {
    if (this.props.data.loading === false) {
      let response = this.props.data.category.products;

      let num = 0;
      let button = true;
      let pricesNum = 0;
      let attributes = [];

      let id = window.location.pathname.split('/')[2];
      for (let i = 0; i < response.length; i++) {
        if (response[i].id === id) {
          num = i;
        }
      }

      for (let i = 0; i < response[num].attributes.length; i++) {
        attributes.push(response[num].attributes[i]);
      }

      for (let i = 0; i < response[num].prices.length; i++) {
        if (response[num].prices[i].currency.label === this.props.currency.split(' ')[1]) {
          pricesNum = i;
        }
      }

      return (
        <div className={style.wrapper}>
          {this.props.checkAttributes(attributes)}
          <div className={style.smallPhotos}>
            {response[num].gallery.map((g, index) => (
              <div key={index} className={style.item}>
                <button className={style.button} onClick={() => this.props.setBigPhoto(g)}>
                  <img className={style.img} src={g} />
                </button>
              </div>
            ))}
          </div>
          <div className={style.bigPhoto}>
            <img
              className={response[num].inStock ? style.big : `${style.big} ${style.outOfStock}`}
              src={this.props.bigPhoto ? this.props.bigPhoto : response[num].gallery[0]}
            />
            <div className={response[num].inStock ? '' : style.outOfStockText}>OUT OF STOCK</div>
          </div>

          <div className={style.options}>
            <h1>{response[num].brand}</h1>
            <h2>{response[num].name}</h2>

            {response[num].attributes.map((item, index) => (
              <>
                <h3 key={index}>{item.name}:</h3>
                {item.type === 'text' ? (
                  <div className={style.textItemBox}>
                    {item.items.map((i, index) => (
                      <div
                        key={index}
                        onClick={() => this.props.changeAttributes(item, i)}
                        className={
                          this.props.attributes[item.id] === i.id
                            ? `${style.textItem} ${style.textActive}`
                            : style.textItem
                        }>
                        {i.value}
                      </div>
                    ))}
                  </div>
                ) : item.type === 'swatch' ? (
                  <div className={style.swatchItem}>
                    {item.items.map((i, index) => (
                      <div
                        key={index}
                        onClick={() => this.props.changeAttributes(item, i)}
                        className={
                          this.props.attributes[item.id] === i.id
                            ? `${style.pointer} ${i.id} on`
                            : `${style.pointer} ${i.id}`
                        }></div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </>
            ))}
            <h3>
              Price:
              <br />
              <strong>
                {response[num].prices[pricesNum].currency.symbol}{' '}
                {response[num].prices[pricesNum].amount}
              </strong>
            </h3>
            {response[num].inStock ? (
              <div>
                <button
                  onClick={() => {
                    attributes.map((i) => (this.props.attributes[i.id] ? '' : (button = false)));
                    button
                      ? this.props.addToBag(id, this.props.attributes)
                      : alert('Please select product features');
                    this.button = true;
                  }}
                  className={style.btn}>
                  <div className={style.text}>ADD TO CART</div>
                </button>
              </div>
            ) : (
              <div>
                <button className={style.btn} disabled>
                  <div className={style.text}>OUT OF STOCK</div>
                </button>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: response[num].description }} />
          </div>
        </div>
      );
    }
  }
}
export default graphql(GetInfo)(SelectItem);
