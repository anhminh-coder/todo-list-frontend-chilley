import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} />
            <ListItemText
                primary={todo.title}
                secondary={todo.description}
                sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
            />
        </ListItem>
    );
}

export default TodoItem;
