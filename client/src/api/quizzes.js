const API_URL = "http://localhost:5000/api/quizzes";


// fetch quizzes
export const fetchQuizzes = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

//create quiz
export const createQuiz = async(quizData) => {
const res = await fetch(API_URL, {
    method: "POST",
    headers: {"content-Type": "application/json"},
    body: JSON.stringify(quizData)
});
    return res.json();
};

