import React from 'react';
import { connect } from 'react-redux';
import Bag from './Bag';
import { active, changeAttributes } from './../../redux/pages-reducer';
import {
  addAttribute,
  addToBag,
  increment,
  decrement,
  deleteItem,
} from './../../redux/bag-reducer';

class BagContainer extends React.Component {
  activeModal = (boolean) => {
    this.props.active(boolean);
  };
  changeAttributes = (attribute, item) => {
    this.props.changeAttributes(attribute.id, item.id);
  };
  delete = (id) => {
    let state = {};
    for (let key in this.props.bag) {
      if (key !== id) {
        state = { ...state, [key]: this.props.bag[key] };
      }
    }
    this.props.deleteItem(state);
  };

  render() {
    return (
      <>
        <Bag
          addSmallPhotos={this.props.addSmallPhotos}
          setSmallPhoto={this.props.setSmallPhoto}
          bag={this.props.bag}
          active={this.props.modal}
          activeModal={this.activeModal}
          changeAttributes={this.changeAttributes}
          attributes={this.props.attributes}
          addAttribute={this.props.addAttribute}
          addToBag={this.props.addToBag}
          currency={this.props.currency}
          increment={this.props.increment}
          decrement={this.props.decrement}
          totalCount={this.props.totalCount}
          delete={this.delete}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    bag: state.bag,
    modal: state.pages.modal,
    attributes: state.pages.attributes,
    currency: state.pages.currency,
    totalCount: state.pages.totalCount,
  };
};

export default connect(mapStateToProps, {
  active,
  changeAttributes,
  addAttribute,
  addToBag,
  increment,
  decrement,
  deleteItem,
})(BagContainer);
