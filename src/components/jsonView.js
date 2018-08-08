import React, {Component} from 'react';
import {CategoriesContext} from '../context/categories';

class JsonView extends Component {
  render() {
    return (
      <div>
        <CategoriesContext.Consumer>
          {(context) => (
            <pre>{JSON.stringify(context.state.tabs, null, 2)}</pre>
          )}
        </CategoriesContext.Consumer>
      </div>
    );
  }
}

export default JsonView;
