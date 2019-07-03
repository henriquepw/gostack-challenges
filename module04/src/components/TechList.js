import React, { Component } from 'react';

import TechItem from './TechItem';
class TechList extends Component {
  state = {
    newTech: '',
    techs: [],
  };

  componentDidMount() {
    const techs = localStorage.getItem('techs');
  
    if (techs) this.setState({ techs: JSON.parse(techs)});
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }  
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { techs, newTech } = this.state;
    this.setState({
      techs: [...techs, newTech],
      newTech: '',
    });
  }

  handleDelete = tech => {
    this.setState({ techs: [...this.state.techs.filter(t => t !== tech)] });
  }

  render() {
    const { techs, newTech } = this.state;
    console.log(techs);
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem  
              key={tech} 
              tech={tech}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
        <input 
          type='text' 
          onChange={this.handleInputChange}
          value={newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;