import React, { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { ToDoListForm } from './ToDoListForm';
import { GetTodos, WriteTodo } from '../../dbHandler';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/styles';
import { debounce } from 'lodash';


const useStyles = makeStyles({
  complete: {
    color: '#76B947'
  }
})

const delaySave = debounce(WriteTodo, 1000);

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();
  const classes = useStyles();
  
  useEffect(() => {
    GetTodos()
      .then(setToDoLists)
  }, [])

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
            {toDoLists[key].todos.every((todo) => todo.complete) ? <CheckIcon className={classes.complete} /> : ''}
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        toDoLists[activeList].todos = todos;
        // Save to database!

        delaySave(toDoLists);

        setToDoLists([...toDoLists]); // Force re-render since we are passing a new list. Thanks spread operator ;)
      }}
    />}
  </Fragment>
}
