import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getPathTree, elementDelete, elementCreate } from './service';
import { Grid, Form, Dropdown, Container, Button, Icon, Label, Menu, Table } from 'semantic-ui-react'

class App extends Component {

  state = { pathTree: {}, isForm: false, type: null, name: '' };

  componentWillMount() {
    getPathTree('D://')
      .then((res) => res.json()
        .then(result => {
          console.log(result);
          this.setState({ pathTree: result });
        }));
  }

  onHandleClick(route) {
    getPathTree(route)
      .then((res) => res.json()
        .then(result => {
          console.log(result);
          this.setState({ pathTree: result });
        }));
  }

  onDelete(route) {
    elementDelete(route)
      .then((res) => {
        if (res.status !== 200) {
          return alert('Access dinied. This folder is not empty');
        }
        return res.json()
          .then(result => {
            console.log(result);
            this.setState({ pathTree: result });
          });
      })
  }

  onBack(event, route) {
    console.log(event.key);
    getPathTree(route)
      .then((res) => res.json()
        .then(result => {
          console.log(result);
          this.setState({ pathTree: result });
        }));
  }

    onSubmit = () => {
    elementCreate(this.state.pathTree.current, this.state.name, this.state.type)
    .then((res) => {
      return res.json()
        .then(result => {
          console.log(result);
          this.setState({ pathTree: result, isForm : false, type : null, name : "" });
        });
    })
  }

  onCreate() {
    this.setState({ isForm: true });
  }

  render() {
    var stateOptions = [{ key: 'file', value: '/file', text: 'file' }, { key: 'directory', value: '/directory', text: 'directory' }]
    return (
      <Grid.Row className="App" >
        <Container textAlign="left">

          <Button icon="arrow left" onClick={(event) => this.onBack(event, this.state.pathTree.previous)} content="BACK" basic color="green" />

          <Button icon="plus" onClick={() => this.onCreate()} content="CREATE" color="orange" />

        </Container>
        {this.state.isForm &&
          <Container text>
            <Form>
              <Form.Field>
                <label>name</label>
                <input placeholder='name' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>type</label>
                <Dropdown placeholder='type' search selection options={stateOptions} onChange={(event, param) => this.setState({ type: param.value })} />
              </Form.Field>

              <Button icon="plus" onClick={this.onSubmit} content="SUBMIT" color="orange" />
            </Form>
          </Container>}
        <Container>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>CURRENT FOLDER :  {this.state.pathTree.current}</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>

            </Table.Header>

            <Table.Body>
              {this.state.pathTree.children && this.state.pathTree.children.map((element, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {element.folder && <a onClick={() => this.onHandleClick(element.path)} >
                        <Icon name="folder" />{element.path}
                      </a>}
                      {!element.folder && <div><Icon name="file" /> {element.path} </div>}
                    </Table.Cell>
                    <Table.Cell>
                      <Button icon="trash" onClick={() => this.onDelete(element.path)} content="DELETE" color="red" />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell/>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </Grid.Row>
    );
  }
}

export default App;
