import React from "react"

const PizzaForm = (props) => {
  
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" name="topping" placeholder="Pizza Topping" value={
              props.pizza ? props.pizza.topping : null
              } onChange={(e) => props.updateSelectedPizza(e.target)}/>
        </div>
        <div className="col">
          <select value={props.pizza ? props.pizza.size : null} className="form-control" name="size" 
              onChange={(event) => props.updateSelectedPizza(event.target)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input  type="radio" value="Vegetarian" name="vegetarian" checked={props.pizza && props.pizza.vegetarian ? true : false} 
                onChange={(event) => {
                  const vegetarian = {name: event.target.name, value: true}
                  props.updateSelectedPizza(vegetarian)}}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input  type="radio" value="Not Vegetarian" name="vegetarian" checked={props.pizza && !props.pizza.vegetarian ? true : false} 
                onChange={(event) => {
                  const notVegetarian = {name: event.target.name, value: false}
                  props.updateSelectedPizza(notVegetarian)}}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={(event) => props.handleSubmit(event)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
