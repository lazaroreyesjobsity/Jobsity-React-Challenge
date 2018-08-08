import React, {Component, Fragment} from 'react';
import t from 'tcomb-form';
import styled from 'styled-components';

import Colors from '../styles/colors';
import {CategoriesContext} from "../context/categories";
import {basicForm, noneForm, numberForm} from "../formConfigs/formsType";
import '../styles/formStyles.css';

const Form = t.form.Form;

const SaveBtn = styled.button`
  color: ${Colors.$white};
  background-color: ${Colors.$green}
`;

const EnumList = styled.ul`
    position: absolute;
    left: 50%;
    top: 192px;
    min-height: 160px;
    list-style: none;
    
    li {
      background-color: ${Colors.$lightGray};
      border-radius: 3px;
      padding: 1px 5px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    i.fa {
      color: ${Colors.$red};
      margin-left: 5px;
      cursor: pointer;
    }
`;

class ItemForm extends Component {
  cContext = null;

  basic = {
    name: {
      error: <small className="error">Required</small>,
      legend: <small>Name: </small>,
      attrs: {
        placeholder: 'Enter a name',
        className: 'mdl-textfield__input'
      }
    },
    description: {
      legend: <small>Description: </small>,
      attrs: {
        placeholder: 'Enter a description from your new attribute',
        className: 'mdl-textfield__input'
      }
    },
    deviceResourceType:{
      disabled: true,
      legend: <small>Device Resource Type: </small>,
      attrs: {
        placeholder: 'Default Value',
        className: 'mdl-textfield__input'
      }
    },
    defaultValue: {
      legend: <small>Default Value: </small>,
      attrs: {
        placeholder: 'Enter a default Value',
        className: 'mdl-textfield__input'
      }
    },
    dataType: {
      legend: <small>Data Type: </small>,
      attrs: {
        className: 'mdl-selectfield__select'
      }
    },
    format: {
      legend: <small>Format: </small>,
      attrs: {
        className: 'mdl-selectfield__select'
      }
    }
  };

  basicObject = {
    defaultValue: {
      disabled: true,
      legend: <small>Default Value: </small>,
      attrs: {
        placeholder: 'Enter a default Value',
        className: 'mdl-textfield__input'
      }
    },
    format: {
      disabled: true,
      legend: <small>Format: </small>,
      attrs: {
        className: 'mdl-selectfield__select'
      }
    }
  };

  none = {
    enumerations: {
      template: (locals) => {
        // handle value changes
        function onChange(evt) {
          locals.onChange(evt.target.value);
        }

        return (
          <div>
            <label>Enumerations:</label>
            <input
              type="text"
              placeholder="Enter value"
              className="mdl-textfield__input"
              onChange={onChange}
              value={locals.value}
            />
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect enumerations-btn"
                    onClick={(event) => this.addEnum(event, locals)}
            >
              Add
            </button>
          </div>
        );
      }
    }
  };

  number = {
    rangeMin: {
      error: <small className="error">Required</small>,
      legend: <small>Range Min: </small>,
      attrs: {
        placeholder: 'Range Min',
        className: 'mdl-textfield__input'
      }
    },
    rangeMax: {
      error: <small className="error">Required</small>,
      legend: <small>Range Max: </small>,
      attrs: {
        placeholder: 'Range Max',
        className: 'mdl-textfield__input'
      }
    },
    unitOfMeasurement: {
      error: <small className="error">Required</small>,
      legend: <small>Unit of Measurement: </small>,
      attrs: {
        placeholder: 'UoM (eg. mm)',
        className: 'mdl-textfield__input'
      }
    },
    precision: {
      error: <small className="error">Required</small>,
      legend: <small>Precision: </small>,
      attrs: {
        placeholder: 'Precision (eg. 0.5)',
        className: 'mdl-textfield__input'
      }
    },
    accuracy: {
      error: <small className="error">Required</small>,
      legend: <small>Accuracy: </small>,
      attrs: {
        placeholder: 'Accuracy (eg. 0.5)',
        className: 'mdl-textfield__input'
      }
    }
  };

  basicOptions = {fields: {...this.basic}};

  basicObjectOptions = {fields: {...this.basic, ...this.basicObject}};

  noneOptions = {fields: {...this.basic, ...this.none}};

  numberOptions = {fields: {...this.basic, ...this.number}};

  state = {
    opt: this.basicOptions,
    frm: basicForm,
    value: null,
    formError: false,
    enums: []
  };

  componentDidMount() {
    let value = null;

    if(this.state.value) {
      value = this.state.value;
    } else if(this.props.value) {
      value = this.props.value;
    }

    if(value) {
      if(value.dataType === 'OBJECT') {
        this.setState({
          opt: this.basicObjectOptions,
          frm: basicForm
        });
      } else {
        switch (value.format) {
          case 'NONE':
            this.setState({
              opt: this.noneOptions,
              frm: noneForm,
              value: {...value, enumerations: null},
              enums: value.enumerations
            });
            break;
          case 'NUMBER':
            this.setState({
              opt: this.numberOptions,
              frm: numberForm
            });
            break;
          default:
            break;
        }
      }
    }
  }

  updateStateError = (prop, text, error) => {
    this.setState({
      opt: {
        fields: {
          ...this.state.opt.fields,
          [prop]: {
            ...this.state.opt.fields[prop],
            hasError: error,
            error: <small className="error">{text}</small>
          }
        }
      },
      formError: error
    });
  };

  onChange = (value, path) => {
    switch (path[0]) {
      case 'dataType':
        switch (value.dataType) {
          case 'OBJECT':
            this.setState({
              opt: this.basicObjectOptions,
              frm: basicForm
            });
            break;
          case 'STRING':
            this.setState({
              opt: this.basicOptions,
              frm: basicForm
            });
            break;
          default:
            break;
        }
        break;
      case 'format':
        switch (value.format) {
          case 'NONE':
            this.setState({
              opt: this.noneOptions,
              frm: noneForm
            });
            break;
          case 'NUMBER':
            this.setState({
              opt: this.numberOptions,
              frm: numberForm
            });
            break;
          default:
            if(value.dataType !== 'OBJECT') {
              this.setState({
                opt: this.basicOptions,
                frm: basicForm
              });
            }
            break;
        }
        break;
      case 'name':
        if(this.cContext.checkDuplicatedName(value.name, value.id)) {
          this.updateStateError('name', 'Duplicated name', true);
        } else {
          this.updateStateError('name', 'Required', false);
        }
        break;
      case 'rangeMin':
        if(value.rangeMin && value.rangeMax && parseFloat(value.rangeMin) > parseFloat(value.rangeMax)) {
          this.updateStateError('rangeMin', 'Min can’t be greater than max', true);
        } else {
          this.updateStateError('rangeMin', 'Required', false);
        }
        break;
      case 'rangeMax':
        if(value.rangeMin && value.rangeMax && parseFloat(value.rangeMin) > parseFloat(value.rangeMax)) {
          this.updateStateError('rangeMax', 'Max can’t be lower than min', true);
        } else {
          this.updateStateError('rangeMax', 'Required', false);
        }
        break;
      case 'precision':
        const rangePrecision = ((value.rangeMax && value.rangeMin) && (value.rangeMax !== value.rangeMin)) ? value.rangeMax - value.rangeMin-1 : null;
        if(!rangePrecision || rangePrecision === 'NaN' || rangePrecision % value.precision !== 0) {
          this.updateStateError('precision', 'Invalid precision', true);
        } else {
          this.updateStateError('precision', 'Required', false);
        }
        break;
      case 'accuracy':
        const rangeAccuracy = ((value.rangeMax && value.rangeMin) && (value.rangeMax !== value.rangeMin)) ? value.rangeMax - value.rangeMin-1 : null;
        if(!rangeAccuracy || rangeAccuracy === 'NaN' || rangeAccuracy % value.accuracy !== 0) {
          this.updateStateError('accuracy', 'Invalid accuracy', true);
        } else {
          this.updateStateError('accuracy', 'Required', false);
        }
        break;
      default:
        break;
    }

    this.setState({value});
  };

  saveContext = (context) => {
    this.cContext = context;
    return(<br/>);
  };

  save = (event) => {
    event.preventDefault();

    const {category} = this.props;
    let id = null;

    if(this.state.value && this.state.value.id) {
      id = this.state.value.id;
    } else if(this.props.value && this.props.value.id) {
      id = this.props.value.id;
    }

    // this.refs is deprecated in v16+ but tcomb-form does not get along with React.createRef()
    const value = this.refs.form.getValue();

    if(value) {
      let val = {...value};

      if(id) {
        val.id = id;
      }

      if(val.format === 'NONE') {
        val.enumerations = this.state.enums;
      }

      this.cContext.add(category, val);
    }
  };

  renderEnums = () => {
    if(this.state.enums) {
      return (
        this.state.enums.map((e, i) => (
          <li key={e}>
            {e}
            <i onClick={() => this.removeEnum(i)} className="fa fa-minus-circle"/>
          </li>
        )
      ));
    }

    return <span/>
  };

  addEnum = (event, locals) => {
    event.preventDefault();

    this.setState({
      enums: [...this.state.enums, locals.value],
      value: {...this.state.value, enumerations: null}
    });
  };

  removeEnum = (index) => {
    let enums = [...this.state.enums];
    enums.splice(index, 1);
    this.setState({ enums });
  };

  render() {
    return (
      <Fragment>
        <CategoriesContext.Consumer>
          {(context) => (
            <Fragment>
              {this.saveContext(context)}
            </Fragment>
          )}
        </CategoriesContext.Consumer>
        <form onSubmit={this.save}>
          <Form
            ref="form"
            type={this.state.frm}
            options={this.state.opt}
            onChange={this.onChange}
            value={this.state.value || this.props.value}
          />
          <EnumList>
            {this.renderEnums()}
          </EnumList>
          <div className="buttons-area">
            <SaveBtn className="mdl-button mdl-js-button mdl-js-ripple-effect"
                     type="submit"
                     disabled={this.state.formError}
            >
              {((this.state.value && this.state.value.id) || (this.props.value && this.props.value.id))  ? 'Update' : 'Save'}
            </SaveBtn>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default ItemForm;
