import React from 'react';
import { connect } from 'react-redux';
import Items from './Items';
class ItemsContainer extends React.Component {
  render() {
    return (
      <>
        <Items currency={this.props.currency} store={this.props.store} key={this.props.key} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    currency: state.pages.currency,
  };
};

export default connect(mapStateToProps, {})(ItemsContainer);
