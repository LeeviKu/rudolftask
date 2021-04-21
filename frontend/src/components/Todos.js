import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Modal from 'react-modal'
import { TextField } from "@material-ui/core"
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import "../tasks.css"

const tasksRequest = (token) => {
    console.log(token)
    return axios.get("https://rudolf-task.herokuapp.com/api/tasks", {
        headers: {'Authorization': `Bearer ${token}`}
    }).then(result => result.data)
}

const getTasks = async (setTasks, token) => {
    const tasks = await tasksRequest(token)
    console.log(tasks)
    setTasks(tasks)
}

const deleteTask = async (task, token, setTasks, tasks) => {
    axios.delete('https://rudolf-task.herokuapp.com/api/tasks', {
        headers: {'Authorization': `Bearer ${token}`},
        data: {title : task.title}
    }).then(setTasks(tasks.filter(i => i.title !== task.title ))).catch(error => console.log(error))

}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default function Todos(props) {
    const [tasks, setTasks] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState()

    useEffect(() => {
        getTasks(setTasks, props.token)
    }, []);

    function closeModal(){
        setIsOpen(false);
    }
    
    const handleClick = async e => {
        setIsOpen(true)
    }

    const handleSubmit = async (e, token) => {
        e.preventDefault();
        let duplicate = false
        await tasks.forEach((i) => {
            if (i.title === title) {
                duplicate = true
            }
        })
        closeModal()
        if (!duplicate) {
            await axios.post('https://rudolf-task.herokuapp.com/api/tasks', {
                title: title
            }, {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(setTasks([...tasks, {title: title}]))
        }
    }

    return ( 
        <div className="wrapper">
            <Box p={2}>
            <Button style={{
                backgroundColor: "#444D63",
                color: "#F2F2F2",
                borderRadius: 9,
                fontSize: 16,
                maxWidth: '160px', maxHeight: '40px', minWidth: '160px', minHeight: '40px'
            }} onClick={handleClick} width="300" variant="contained" type="submit">Add task
            </Button>
            </Box>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <form onSubmit={(event) => handleSubmit(event, props.token)}>
                    <Box mb={3}>
                        <TextField InputLabelProps={{
                                style: {color: "#C6C6C6",
                                fontSize: 18
                                }
                            }} 
                            fullWidth={true} className="titleField" label="Title" 
                            variant="outlined" onChange={e => setTitle(e.target.value)}>
                            </TextField>
                    </Box>
                    <Box style={{display: 'inline-block'}} pr={28}>
                    <Button style={{
                        backgroundColor: "#444D63",
                        color: "#F2F2F2",
                        borderRadius: 9,
                        fontSize: 16,
                        maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px'
                        }} onClick={handleClick} variant="contained" type="submit">Add
                    </Button>
                    </Box>
                    <Box style={{display: 'inline-block'}}>
                    <Button style={{
                        backgroundColor: "#444D63",
                        color: "#F2F2F2",
                        borderRadius: 9,
                        fontSize: 16,
                        maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px'
                        }} onClick={closeModal} variant="contained">Cancel
                    </Button>
                    </Box>
                </form>
            </Modal>
            <div className="tasks">
            {tasks.map((item) => {
                return (
                    <div>
                    <span>{item.title}</span>
                    <IconButton onClick={() => deleteTask(item, props.token, setTasks, tasks)}>
                        <DeleteIcon style={{fontSize: "22px"}} />
                    </IconButton>
                    </div>
                )
                })}
            </div>
        </div>
        )
    }