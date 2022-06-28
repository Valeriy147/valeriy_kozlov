import React from 'react';
import style from './SelectedType.module.css';
import ItemsContainer from './Items/ItemsContainer';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

const GetInfo = gql`
  query {
    category {
      products {
        id
        name
        inStock
        description
        gallery
        category
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
class SelectedType extends React.Component {
  render() {
    if (this.props.data.loading === false) {
      let response = this.props.data.category.products;
      let prods = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].category === this.props.type || this.props.type === 'all') {
          prods.push(response[i]);
        }
      }
      return (
        <div className={style.wrapper}>
          <div className={style.block}>
            {prods.map((i) => {
              return <ItemsContainer store={i} key={i.id} />;
            })}
          </div>
        </div>
      );
    }
  }
}
export default graphql(GetInfo)(SelectedType);
