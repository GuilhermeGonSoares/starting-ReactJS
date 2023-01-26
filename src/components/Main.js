import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      novaTarefa: '',
      tarefas: [],
      index: -1,
    };
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (novaTarefa.length === 0) return;
    if (tarefas.includes(novaTarefa)) return;
    const novasTarefas = [...tarefas];

    if (index !== -1) {
      const liToEdit = document.querySelectorAll('.tarefas li')[index];
      liToEdit.style.background = 'white';

      novasTarefas[index] = novaTarefa;
      this.setState({
        tarefas: [...novasTarefas],
        novaTarefa: '',
        index: -1,
      });
      return;
    }

    this.setState({
      tarefas: [...novasTarefas, novaTarefa],
      novaTarefa: '',
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    const tarefaToEdit = tarefas[index];

    const liToEdit = document.querySelectorAll('.tarefas li')[index];
    liToEdit.style.background = '#51c5de';

    this.setState({
      novaTarefa: tarefaToEdit,
      index,
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    if (tarefas.length <= 0) return;

    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />

      </div>
    );
  }
}
