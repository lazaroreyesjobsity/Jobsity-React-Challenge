import React, { Component } from 'react';
import 'material-design-lite/dist/material.light_green-red.min.css';
import styled from 'styled-components';

import Colors from './styles/colors';
import './App.css';
import {CategoriesProvider} from './context/categories';
import JsonView from './components/jsonView';
import TabsView from './components/tabsView';

const Heading = styled.h1`
  text-align: center;
  color: ${Colors.$gray};
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 30px 0;
  
  .mdl-switch {
    width: initial;
  }
  
  .switch-label {
    color: ${Colors.$gray};
    margin: 0 10px;
    
    &.right {
      margin-left: 20px;
    }
    
    &.active {
      color: ${Colors.$grayDark};
    }
  }
`;



class App extends Component {
  state = {
    viewTable: true
  };

  handleChange = () => {
    this.setState({viewTable: !this.state.viewTable});
  };

  componentDidUpdate() {
    window.componentHandler.upgradeDom();
  }

  render() {
    return (
      <CategoriesProvider>
        <div className="container app">
          <Heading className="mdl-typography--display-2">Jobsity React Challenge</Heading>
          <br/>

          <SwitchContainer>
            <label className={`switch-label ${this.state.viewTable ? '' : 'active'}`}>View JSON</label>
            <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
              <input type="checkbox" id="switch-1"
                     className="mdl-switch__input"
                     onChange={this.handleChange}
                     checked={this.state.viewTable}
              />
              <span className="mdl-switch__label"/>
            </label>
            <label className={`switch-label right ${this.state.viewTable ? 'active' : ''}`}>View Table</label>
          </SwitchContainer>

          {this.state.viewTable ? <TabsView /> : <JsonView />}
        </div>
      </CategoriesProvider>
    );
  }
}

export default App;
