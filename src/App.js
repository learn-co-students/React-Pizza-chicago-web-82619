import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: null
  }

  componentDidMount(){
      fetch('http://localhost:3000/pizzas')
        .then(resp => resp.json())
        .then(data => {
          this.setState({pizzas: data})
        })
  }

  selectPizza = (pizza) => {
    this.setState({selectedPizza: pizza})
  }

  updateSelectedPizza = (event) => {
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        [event.name]: event.value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const id = this.state.selectedPizza.id
    const pizza = this.state.selectedPizza
      fetch(`http://localhost:3000/pizzas/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            topping: pizza.topping,
            size: pizza.size,
            vegetarian: pizza.vegetarian
          })
        })
        .then(resp => resp.json())
        .then(pizzaData => {
          console.log(pizzaData)
          const newPizzas = this.state.pizzas.map(pizza => {
            if(pizza.id === pizzaData.id){
              return pizzaData
            } else {
              return pizza
            }
          })
          this.setState({pizzas: newPizzas})
        })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm  pizza={this.state.selectedPizza} updateSelectedPizza={this.updateSelectedPizza} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} selectPizza={this.selectPizza}/>
      </Fragment>
    );
  }
}

export default App;
