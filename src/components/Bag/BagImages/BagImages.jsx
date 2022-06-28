import React from 'react';
import left from '../../../assets/left.png';
import right from '../../../assets/right.png';
import style from './BagImages.module.css';
import { NavLink } from 'react-router-dom';

class BagImages extends React.Component {
  state = { count: 0 };
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    let i = this.props.i;
    return (
      <div className={style.imgContainer}>
        <NavLink to={`/item/${i.id}`}>
          <img className={style.img} src={i.gallery[this.state.count]} />
        </NavLink>
        <div className={style.arrow}>
          {i.gallery[this.state.count - 1] ? (
            <div>
              <img onClick={this.handleDecrement} alt="left button" src={left} />
            </div>
          ) : (
            <div>
              <img className={style.disable} alt="left button" src={left} />
            </div>
          )}
          {i.gallery[this.state.count + 1] ? (
            <div>
              <img onClick={this.handleIncrement} alt="right button" src={right} />
            </div>
          ) : (
            <div>
              <img className={style.disable} alt="right button" src={right} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BagImages;
