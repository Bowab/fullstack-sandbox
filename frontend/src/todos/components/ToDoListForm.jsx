import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  todoComplete: {
    color: '#76B947'
  },
  todoNotComplete: {
    color: '#000'
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  const HandleSubmit = event => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  }

  const HandleChange = index => event => {
    let newArr = [...todos]; // Copying the old todos array
    newArr[index] = { todo: event.target.value, complete: newArr[index].complete };
    setTodos(newArr);

    todos[index] = newArr[index];

    saveToDoList(toDoList.id, { todos });
  }

  const AddTodoItem = () => {
    var newElement = { todo: '', complete: false };
    setTodos([...todos, newElement]);

    // AutoSave.
    todos.push(newElement);
    saveToDoList(toDoList.id, { todos });
  }

  const ToggleDone = (item) => {

    var uncompletedTodos = todos.filter(x => !x.complete).length;

    if (!item.complete && uncompletedTodos >= 1) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: uncompletedTodos > 1 ? `Great! only ${uncompletedTodos - 1} to go` : 'Great! Your\'re all done',
        showConfirmButton: false,
        timer: 1500
      })
    }

    item.complete = !item.complete;
    setTodos([...todos]);
    saveToDoList(toDoList.id, { todos });
  }

  const RemoveTodoItem = index => () => {

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
      dangerMode: true,
    })
      .then((done) => {
        if (done.isConfirmed) {
          var cloneList = [
            ...todos.slice(0, index),
            ...todos.slice(index + 1),
          ];
          setTodos(cloneList);
          saveToDoList(toDoList.id, { todos: cloneList })

          Swal.fire({
            title: "Poof! Your todo has been deleted!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Your todo was not deleted"
          })
        }
      });
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={HandleSubmit} className={classes.form}>
          {todos.map((item, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={item.todo}
                onChange={HandleChange(index)}
                className={classes.textField}
              />
              <Button
                size='small'
                className={classes.standardSpace, (item.complete ? classes.todoComplete : classes.todoNotComplete)}
                onClick={() => ToggleDone(item)}>
                {item.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </Button>
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={RemoveTodoItem(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={AddTodoItem}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
