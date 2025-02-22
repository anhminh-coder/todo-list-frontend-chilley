import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

function TodoInput({ addTodo }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;
        addTodo(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
                label="Task Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Task
            </Button>
        </Stack>
    );
}

export default TodoInput;
