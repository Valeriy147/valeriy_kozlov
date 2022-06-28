import React from 'react';
import { connect } from 'react-redux';
import Pages from './Pages';
class PagesContainer extends React.Component {
  render() {
    return (
      <>
        <Pages type={this.props.type} />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    pages: state.pages.pages,
  };
};

export default connect(mapStateToProps, {})(PagesContainer);
