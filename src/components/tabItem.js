import React, {Component, Fragment} from 'react';
import styled from 'styled-components';

import Colors from '../styles/colors';
import {CategoriesContext} from "../context/categories";
import ItemText from './itemText';
import ItemForm from './itemForm';
import Attribute from './attribute';

const TabItemContainer = styled.div`
  border: 2px solid ${Colors.$green};
  margin-top: 5px;
`;

const FormContainer = styled.div`
  padding: 0 30px 30px;
  position: relative;
`;

const ButtonStyle = styled.button`
    box-shadow: none;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    
    i.fa {
      margin-right: 8px;
    }
    
    &.add {
      color: ${Colors.$green};
      background-color: ${Colors.$lightGreen};
      
      &:hover {
        background-color: ${Colors.$green};
        color: ${Colors.$lightGreen};
      }
    }
    
    &.remove {
    color: ${Colors.$red};
      background-color: ${Colors.$lightRed};
      
      &:hover {
        background-color: ${Colors.$red};
        color: ${Colors.$lightRed};
      }
    }
`;

class TabItem extends Component {
  renderAttr = (attrs) => {
    const {category} = this.props;
    let attrsList = [];

    for (var key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        attrsList.push({[key]: attrs[key]});
      }
    }

    return attrsList.map((attr, index) => (<Attribute key={index} category={category} attr={attr}/>));
  };

  render() {
    const {category} = this.props;

    return(
      <TabItemContainer>
        <ItemText category={category}/>
        <CategoriesContext.Consumer>
          {(context) => (
            <Fragment>
              {this.renderAttr(context.state.tabs[category])}
              {context.state.activeAdd ? <FormContainer><ItemForm category={category}/></FormContainer> : ''}
              <ButtonStyle
                className={`mdl-button mdl-js-button mdl-js-ripple-effect ${context.state.activeAdd ? 'remove' : 'add'}`}
                onClick={() => context.toggleAddNew()}
              >
                <i className={context.state.activeAdd ? 'fa fa-trash-o' : 'fa fa-plus-circle'}/>
                {context.state.activeAdd ? 'Cancel' : 'Add Attribute'}
              </ButtonStyle>
            </Fragment>
          )}
        </CategoriesContext.Consumer>
      </TabItemContainer>
    );
  }
}

export default TabItem;
