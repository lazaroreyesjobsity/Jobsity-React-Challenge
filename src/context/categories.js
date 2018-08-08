import React, {Component} from "react";

export const CategoriesContext = React.createContext();

export class CategoriesProvider extends Component {
  state = {
    activeAdd: false,
    tabs: {
      'Device Info': {
        '4k09k5c0t': {
          id: '4k09k5c0t',
          name: "name1",
          description: "Description for name1",
          deviceResourceType: null,
          defaultValue: "3",
          dataType: "STRING",
          format: "NONE",
          enumerations: [
            "ad",
            "aa",
            "ddd"
          ]
        },
        'j94lxxw6z': {
          id: 'j94lxxw6z',
          name: "name2",
          description: "Description for name2",
          deviceResourceType: null,
          defaultValue: "4",
          dataType: "STRING",
          format: "NUMBER",
          rangeMin: 1,
          rangeMax: 10,
          unitOfMeasurement: "mm",
          precision: 1,
          accuracy: 1
        }
      },
      'Sensors': {
        '6508pedvh': {
          id: '6508pedvh',
          name: "name3",
          description: "Description for name3",
          deviceResourceType: null,
          defaultValue: "The value",
          dataType: "STRING",
          format: "NONE",
          enumerations: []
        },
        '04ne0iu7z': {
          id: '04ne0iu7z',
          name: "name4",
          description: "Description for name4",
          deviceResourceType: null,
          defaultValue: "More values",
          dataType: "STRING",
          format: "NUMBER",
          rangeMin: 1,
          rangeMax: 10,
          unitOfMeasurement: "m",
          precision: 1,
          accuracy: 1
        }
      },
      'Settings': {
        '9m6jx1dvk': {
          id: '9m6jx1dvk',
          name: "name5",
          description: "Description for name5",
          deviceResourceType: null,
          defaultValue: "The value",
          dataType: "OBJECT",
          format: null
        },
        'qu4uurqwr': {
          id: 'qu4uurqwr',
          name: "name6",
          description: "Description for name6",
          deviceResourceType: null,
          defaultValue: "More values",
          dataType: "STRING",
          format: "NUMBER",
          rangeMin: 1,
          rangeMax: 10,
          unitOfMeasurement: "m",
          precision: 1,
          accuracy: 1
        }
      },
      'Commands': {
        '8owxyfya1': {
          id: '8owxyfya1',
          name: "name7",
          description: "Description for name7",
          deviceResourceType: null,
          defaultValue: "The value",
          dataType: "OBJECT",
          format: null
        },
        'wyqxqvj8r': {
          id: 'wyqxqvj8r',
          name: "name8",
          description: "Description for name8",
          deviceResourceType: null,
          defaultValue: "More values",
          dataType: "STRING",
          format: "NUMBER",
          rangeMin: 1,
          rangeMax: 10,
          unitOfMeasurement: "m",
          precision: 1,
          accuracy: 1
        }
      },
      'Metadata': {
        '8b4xyieuo': {
          id: '8b4xyieuo',
          name: "name9",
          description: "Description for name9",
          deviceResourceType: null,
          defaultValue: "The value",
          dataType: "OBJECT",
          format: null
        },
        '4m89plrhl': {
          id: '4m89plrhl',
          name: "name10",
          description: "Description for name10",
          deviceResourceType: null,
          defaultValue: "More values",
          dataType: "STRING",
          format: "NUMBER",
          rangeMin: 1,
          rangeMax: 10,
          unitOfMeasurement: "m",
          precision: 1,
          accuracy: 1
        }
      }
    }
  };

  add = (category, attribute) => {
    let attr = {...attribute};

    if(!attr.id) {
      attr.id = Math.random().toString(36).substr(2, 9);
    }

    this.setState({
      tabs: {
        ...this.state.tabs,
        [category]: {
          ...this.state.tabs[category],
          [attr.id]: {...attr}
        }
      },
      activeAdd: false
    });
  };

  remove = (category, key) => {
    let tabs = {...this.state.tabs};
    delete tabs[category][key];

    this.setState({tabs});
  };

  toggleAddNew = () => {
    this.setState({
      activeAdd: !this.state.activeAdd
    });
  };

  checkDuplicatedName = (name, id) => {
    let count = 0;

    for (var key in this.state.tabs) {
      if (this.state.tabs.hasOwnProperty(key)) {
        for (var key2 in this.state.tabs[key]) {
          if (this.state.tabs[key].hasOwnProperty(key2)) {
            if(this.state.tabs[key][key2].name === name && this.state.tabs[key][key2].id !== id) {
              count++;
            }
          }
        }
      }
    }

    return count > 0;
  };

  render() {
    return (
      <CategoriesContext.Provider value={{
        state: this.state,
        add: this.add,
        remove: this.remove,
        toggleAddNew: this.toggleAddNew,
        checkDuplicatedName: this.checkDuplicatedName
      }}>
        {this.props.children}
      </CategoriesContext.Provider>
    );
  }
}
