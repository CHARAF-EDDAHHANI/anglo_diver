import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export default function QuizBoard({ onCreateQuiz }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState([]);

  // Add a blank question
  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { questionId: Date.now(), text: "", type: "fill_in_blank", options: [], answer: "" }
    ]);
  };

  // Remove a question
  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.questionId !== id));
  };

  // Update question text/type/answer
  const updateQuestion = (id, key, value) => {
    setQuestions(prev =>
      prev.map(q => (q.questionId === id ? { ...q, [key]: value } : q))
    );
  };

  // Add option for multiple_choice
  const addOption = (id) => {
    setQuestions(prev =>
      prev.map(q => q.questionId === id ? { ...q, options: [...q.options, ""] } : q)
    );
  };

  // Update option text
  const updateOption = (qId, index, value) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.questionId === qId) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  // Remove option
  const removeOption = (qId, index) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.questionId === qId) {
          const newOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleCreate = async () => {
    if (!title || !level) return;

    // Basic validation: remove questions without text
    const filteredQuestions = questions.filter(q => q.text.trim() !== "");
    await onCreateQuiz({ title, level, questions: filteredQuestions });

    // Reset
    setTitle("");
    setLevel("");
    setQuestions([]);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Quiz
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Quiz</DialogTitle>
        <DialogContent>
          <TextField
            label="Quiz Title"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ my: 1 }}
          />
          <TextField
            label="Level"
            fullWidth
            value={level}
            onChange={e => setLevel(e.target.value)}
            sx={{ my: 1 }}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>Questions</Typography>

          {questions.map((q, i) => (
            <Card key={q.questionId} sx={{ p: 1, my: 1, position: "relative" }}>
              <IconButton
                onClick={() => removeQuestion(q.questionId)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Delete />
              </IconButton>

              <TextField
                label={`Question ${i + 1}`}
                fullWidth
                value={q.text}
                onChange={e => updateQuestion(q.questionId, "text", e.target.value)}
                sx={{ my: 1 }}
              />

              <TextField
                select
                label="Type"
                value={q.type}
                onChange={e => updateQuestion(q.questionId, "type", e.target.value)}
                fullWidth
                sx={{ my: 1 }}
              >
                <MenuItem value="fill_in_blank">Fill in the blank</MenuItem>
                <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
              </TextField>
              {q.type === "fill_in_blank" && (
                <TextField
                    label="Correct Answer"
                    fullWidth
                    value={q.answer}
                    onChange={e => updateQuestion(q.questionId, "answer", e.target.value)}
                    sx={{ my: 1 }}
                  />
              )}
              {q.type === "multiple_choice" && (
                <>
                  {q.options.map((opt, idx) => (
                    <Grid container spacing={1} key={idx} sx={{ my: 0.5 }}>
                      <Grid item xs={10}>
                        <TextField
                          label={`Option ${idx + 1}`}
                          fullWidth
                          value={opt}
                          onChange={e => updateOption(q.questionId, idx, e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeOption(q.questionId, idx)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button onClick={() => addOption(q.questionId)} sx={{ mt: 1 }}>
                    Add Option
                  </Button>

                  <TextField
                    label="Correct Answer"
                    fullWidth
                    value={q.answer}
                    onChange={e => updateQuestion(q.questionId, "answer", e.target.value)}
                    sx={{ my: 1 }}
                  />
                </>
              )}
            </Card>
          ))}

          <Button variant="outlined" startIcon={<Add />} onClick={addQuestion} sx={{ mt: 1 }}>
            Add Question
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
