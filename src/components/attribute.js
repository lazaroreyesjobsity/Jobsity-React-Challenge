import React, {Component} from 'react';
import {CategoriesContext} from "../context/categories";
import styled from 'styled-components';

import Colors from '../styles/colors';
import ItemForm from './itemForm';
import 'font-awesome/css/font-awesome.min.css';

const AttributeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 20px;
  border-bottom: 2px solid ${Colors.$green};
  max-height: 45px;
  overflow: hidden;
  transition: max-height 500ms ease-in-out;
  position: relative;
  
  &.open {
    max-height: 800px;
  }
`;

const ActionButton = styled.button`
  color: ${Colors.$gray};
  margin: 0 15px;
`;

class Attribute extends Component {

  state = {
    closed: true
  };

  getAttr = () => {
    const {attr} = this.props;
    let attrList = [];

    for (var key in attr) {
      if (attr.hasOwnProperty(key)) {
        attrList.push(attr[key]);
      }
    }

    return attrList[0];
  };

  toggleClosed = () => {
    this.setState({
      closed: !this.state.closed
    });
  };

  render() {
    const {category} = this.props;
    return (
      <CategoriesContext.Consumer>
        {(context) => (
          <AttributeContainer className={!this.state.closed ? 'open' : ''}>
            <ActionButton className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" onClick={() => context.remove(category, this.getAttr().id)} aria-label="Delete">
              <i className="fa fa-trash-o"/>
            </ActionButton>
            <ItemForm value={this.getAttr()} category={category}/>
            <ActionButton className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" onClick={this.toggleClosed} aria-label="Open / Close">
              {this.state.closed
                ? <i className="fa fa-angle-double-down"/>
                : <i className="fa fa-angle-double-up"/>
              }
            </ActionButton>
          </AttributeContainer>
        )}
      </CategoriesContext.Consumer>
    );
  }
}

export default Attribute;
