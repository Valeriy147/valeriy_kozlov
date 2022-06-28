import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import ModalContainer from '../modal/ModalContainer';
import { PureComponent } from 'react';
import bag from '../../assets/bag.png';
import greenBag from '../../assets/greenBag.png';
import vector from '../../assets/vector.png';

class Header extends PureComponent {
  render() {
    return (
      <header className={style.all}>
        <div className={style.head}>
          <div className={style.nav}>
            <div className={style.item}>
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? style.navOn : style.item)}>
                ALL
              </NavLink>
            </div>
            <div className={style.item}>
              <NavLink
                to="/tech"
                className={(navData) => (navData.isActive ? style.navOn : style.item)}>
                TECH
              </NavLink>
            </div>
            <div className={style.item}>
              <NavLink
                to="/clothes"
                className={(navData) => (navData.isActive ? style.navOn : style.item)}>
                CLOTHES
              </NavLink>
            </div>
          </div>
          <div className={style.greenBag}>
            <NavLink to="/bag" className={style.a}>
              <img src={greenBag} />
            </NavLink>
          </div>
          <div className={style.btn}>
            <div className={style.select}>
              <div className={style.symbol} onClick={() => this.props.openCurr(!this.props.open)}>
                {this.props.currency.split(' ')[0]}
                <img
                  className={this.props.open ? `${style.vector} ${style.rotate}` : style.vector}
                  src={vector}></img>
              </div>
              <div
                className={
                  this.props.open ? `${style.modal_content} ${style.open}` : style.modal_content
                }>
                {['$ USD', '£ GBP', 'A$ AUD', '¥ JPY', '₽ RUB'].map((i, index) => (
                  <div
                    key={index}
                    onClick={() => this.props.selectCurrency(i) & this.props.openCurr(false)}
                    className={style.currencyItem}>
                    {i}
                  </div>
                ))}
              </div>

              <div className={style.bag}>
                <div onClick={() => this.props.activeModal(true)}>
                  <img className={style.bagSymbol} src={bag} />
                  {this.props.totalCount > 0 ? (
                    <div className={style.totalCount}>{this.props.totalCount}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div>
              <ModalContainer active={this.props.active} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
