import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import PizzaForm from './components/PizzaForm';
import PizzaList from './containers/PizzaList';
import axios from 'axios';

class App extends Component {
  state = {
    pizzas: [],
    pizzaUnderEdit: {},
  };

  componentDidMount = () => {
    axios
      .get('http://localhost:3000/pizzas')
      .then((pizzaData) => this.setState({ pizzas: pizzaData.data }));
  };

  handleEdit = (pizza) => {
    this.setState({ pizzaUnderEdit: pizza });
  };

  updateSelectedPizza = (event) => {
    console.log(event);
    this.setState({
      pizzaUnderEdit: {
        ...this.state.pizzaUnderEdit,
        [event.name]: event.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.state.pizzaUnderEdit.id;
    const pizza = this.state.pizzaUnderEdit;
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian,
      }),
    })
      .then((resp) => resp.json())
      .then((pizzaData) => {
        console.log(pizzaData);
        const newPizzas = this.state.pizzas.map((pizza) => {
          if (pizza.id === pizzaData.id) {
            return pizzaData;
          } else {
            return pizza;
          }
        });
        this.setState({ pizzas: newPizzas });
      });
  };

  render() {
    let displayedPizza = [...this.state.pizzas];

    return (
      <Fragment>
        <Header />
        <PizzaForm
          pizza={this.state.pizzaUnderEdit}
          updateSelectedPizza={this.updateSelectedPizza}
          handleSubmit={this.handleSubmit}
        />
        <PizzaList pizzas={displayedPizza} handleEdit={this.handleEdit} />
      </Fragment>
    );
  }
}

export default App;
