import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Items.module.css';

class Items extends React.Component {
  render() {
    let price = this.props.store.prices;
    for (let i = 0; i < price.length; i++) {
      if (price[i].currency.label === this.props.currency.split(' ')[1]) {
        return (
          <NavLink to={`/item/${this.props.store.id}`}>
            <div className={style.wrapper}>
              <div className={this.props.store.inStock ? '' : style.outOfStock}>
                <div className={style.container}>
                  <img className={style.img} src={this.props.store.gallery[0]} alt="Main photo" />
                  <div className={this.props.store.inStock ? '' : style.outOfStockText}>
                    OUT OF STOCK
                  </div>
                </div>
                <div className={style.name}>{this.props.store.name}</div>
                <div className={style.price}>
                  {price[i].currency.symbol} {price[i].amount}
                </div>
              </div>
            </div>
          </NavLink>
        );
      }
    }
  }
}

export default Items;
