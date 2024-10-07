import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function TodoList() {
    const [todo, setTodo] = useState({
        description: "",
        date: dayjs(),
        priority: ""
    });

    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const handleAdd = () =>{
        if (!todo.description.trim()) {
            alert("Type description first!")
        } else {
            setTodos([todo, ...todos]);
            setTodo({
                description: "",
                date: dayjs(),
                priority: ""
            });
            
        }
    }

    const handleDelete = () => {
        if(gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => 
                index != gridRef.current.getSelectedNodes()[0].id))
            
        } else {
            alert("Select row first!")
        };
    };

    const [colDefs, setColDefs] = useState([
        {field: "description", filter: true, floatingFilter: true},
        {field: "priority", filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: "red"} : {colour: "black"}},
        {field: "date", filter: true, floatingFilter: true},
        

    ])
    
    
    
    return(
        <>
            
            <Stack direction="row" mt={5} spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    value={todo.description}
                    onChange={event => setTodo({...todo, description: event.target.value})}
                />
                <TextField
                    label="Priority"
                    value={todo.priority}
                    onChange={event => setTodo({...todo, priority: event.target.value})}

                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={todo.date}
                        onChange={date => setTodo({ ...todo, date })}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: "outlined"
                            }
                        }}

                    />
                </LocalizationProvider>
                
                <Button variant="contained" onClick={handleAdd}>Add Todo</Button>
                <Button variant="contained" color="error" endIcon={<DeleteIcon/>}onClick={handleDelete}>Delete</Button>
            </Stack>
            <div className="ag-theme-material" style={{height: 500, width: "90%"}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowData={todos}
                    columnDefs={colDefs}
                    //selection="singleRow"
                    rowSelection="single"
                    
                />
                
            </div>
            

            
        </>
    );
}

export default TodoList;