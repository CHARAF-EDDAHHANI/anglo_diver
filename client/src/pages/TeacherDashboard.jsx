import {useEffect, useState} from "react";
import { Card, CardContent, Typography, Chip, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import {fetchSessions, createSession as apiCreateSession } from "../api/sessions";

import QuizBoard from "../component/QuizBoard";
import {fetchQuizzes, createQuiz } from "../api/quizzes";


export default function TeacherDashboard() {

    const [quizzes, setQuizzes] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionData, setSessionData] =useState({title:"",level:"", type:""})
    const [open, setOpen] = useState(false);


    // quizzes hooks
    useEffect(()=>{
        fetchQuizzes().then(setQuizzes);
    }, []);
    const handleCreateQuiz = async (quizData) => {
        const newQuiz = await createQuiz(quizData);
        setQuizzes(prev=>[...prev, newQuiz]);
    };

    //fetch session from backend
    useEffect(()=>{
        fetchSessions().then(setSessions).catch(console.error);
    }, []);
   
    //createSession handler 
    const handleCreate = async () => {
        const{title,type,level}=sessionData;
        if (!title || !type || !level) return;
        try{
            const newSession = await apiCreateSession(sessionData);
            setSessions(prev => [...prev, newSession]);
            setOpen(false);
            setSessionData({title:"", type:"", level:""});
        }catch (err) {
            console.error(err);
        }
    };


  return (
    <Grid container spacing={2} sx={{mb:2}}>
    <QuizBoard onCreateQuiz={createQuiz}/>
    
    <Grid item>
        <Button 
        variant="contained"
         color="primary"
         onClick={()=> setOpen(true)}>
            Create</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogContent>
                <TextField
                label="title"
                fullWidth
                value={sessionData.title}
                onChange={e => setSessionData({... sessionData, title: e.target.value})
                }
                />
                <TextField
                label="type"
                fullWidth
                value={sessionData.type}
                onChange={(e) => setSessionData({...sessionData, type:e.target.value})
                }
                />
                <TextField
                label="level"
                fullWidth
                value={sessionData.level}
                onChange={(e) => setSessionData({...sessionData, level: e.target.value})
               }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleCreate}>Create</Button>
            </DialogActions>
            </Dialog>
    </Grid>

    {sessions.map((s) => (
      <Grid item xs={12} md={4} key={s.id}>    
      <Card>
      <CardContent>
        <Typography variant="h6">{s.title}</Typography>
        <Typography color="text.secondary">Type: {s.type} </Typography>
        <Typography color="text.secondary">Level: {s.level}</Typography>
        <Chip label="Draft" color="warning" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
    </Grid>
     ))}
  </Grid>
  );
}
