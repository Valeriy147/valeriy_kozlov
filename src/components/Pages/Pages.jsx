import React from 'react';
import { PureComponent } from 'react';
import SelectedType from '../SelectedType/SelectedType';

export class Pages extends PureComponent {
  render() {
    switch (this.props.type) {
      case 'all': {
        return (
          <div>
            <SelectedType type={'all'} />
          </div>
        );
      }
      case 'tech': {
        return (
          <div>
            <SelectedType type={'tech'} />
          </div>
        );
      }
      case 'clothes': {
        return (
          <div>
            <SelectedType type={'clothes'} />
          </div>
        );
      }
      default:
        return <div>PAGE</div>;
    }
  }
}

export default Pages;
