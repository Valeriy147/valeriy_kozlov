import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { active, currencyField, setCurrency } from './../../redux/pages-reducer';

class HeaderContainer extends React.Component {
  activeModal = (boolean) => {
    this.props.active(boolean);
  };
  openCurr = (boolean) => {
    this.props.currencyField(boolean);
  };

  selectCurrency = (currencyValue) => {
    this.props.setCurrency(currencyValue);
  };

  render() {
    return (
      <>
        <Header
          active={this.props.modal}
          activeModal={this.activeModal}
          open={this.props.open}
          openCurr={this.openCurr}
          currency={this.props.currency}
          selectCurrency={this.selectCurrency}
          totalCount={this.props.totalCount}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    modal: state.pages.modal,
    open: state.pages.openCurrency,
    currency: state.pages.currency,
    totalCount: state.pages.totalCount,
  };
};

export default connect(mapStateToProps, { active, currencyField, setCurrency })(HeaderContainer);
