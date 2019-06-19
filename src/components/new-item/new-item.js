import React, {Component} from 'react';

import './new-item.css';

export default class NewItem extends Component  {
  
  state = { 
    label: ''
  };

  onLabelChange = (e) => { // 2) тут получаем тукущее значение поля
    this.setState({
      label: e.target.value
    });
  }

  onSubmit = (e) => { // 3) тут улавливает когда мы нажимаем формачку
    e.preventDefault() // вот это чисто чтоб перезагрузки не было
    this.props.onAdd(this.state.label) // тут передаем onClick
    this.setState( { // чистит после ввода
      label: ''
    });
  };

  render () {
    return (
      <form className="new-item d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
              className="form-control"
              onChange={this.onLabelChange} // 1) onChange для получения текущего значения input 
              placeholder = "Ну шо еще трымать будешь?"
              value = {this.state.label} /*вот это объединяет state и этот html элемент */ />
        <button 
          className="btn btn-outline-secondary"
        onClick={() => this.props.onAdd}>
            Шонада?
        </button> 
      </form>
    );
  };
};
  
