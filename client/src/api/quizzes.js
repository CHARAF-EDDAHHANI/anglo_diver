const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_LOCAL
  : import.meta.env.VITE_API_PROD;

// fetch quizzes
export const fetchQuizzes = async () => {
    const res = await fetch(`${API_URL}/quizzes`);
    return res.json();
};

//create quiz
export const createQuiz = async(quizData) => {
const res = await fetch(`${API_URL}/quizzes`, {
    method: "POST",
    headers: {"content-Type": "application/json"},
    body: JSON.stringify(quizData)
});
    return res.json();
};

