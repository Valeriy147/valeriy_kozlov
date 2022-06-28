import React from 'react';
import { connect } from 'react-redux';
import SelectItem from './SelectItem';
import {
  setBigPhoto,
  changeAttributes,
  cleanAttributes,
  addAttributes,
} from '../../redux/pages-reducer';
import { addToBag } from '../../redux/bag-reducer';

class SelectItemContainer extends React.Component {
  checkAttributes = (attributes) => {
    if (this.props.attributes.length === 0) {
      for (let i = 0; i < attributes.length; i++) {
        this.props.addAttributes(attributes[i]);
      }
    }
  };

  changeAttributes = (attribute, item) => {
    this.props.changeAttributes(attribute.id, item.id);
  };

  render() {
    return (
      <>
        <SelectItem
          setBigPhoto={this.props.setBigPhoto}
          bigPhoto={this.props.bigPhoto}
          addToBag={this.props.addToBag}
          changeAttributes={this.changeAttributes}
          checkAttributes={this.checkAttributes}
          cleanAttributes={this.props.cleanAttributes}
          attributes={this.props.attributes}
          currency={this.props.currency}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    bigPhoto: state.pages.bigPhoto,
    attributes: state.pages.attributes,
    currency: state.pages.currency,
  };
};

export default connect(mapStateToProps, {
  setBigPhoto,
  addToBag,
  addAttributes,
  cleanAttributes,
  changeAttributes,
})(SelectItemContainer);
