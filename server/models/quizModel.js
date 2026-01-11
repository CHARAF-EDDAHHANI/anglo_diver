import { v4 as uuid} from "uuid";
import {readJson, writeJson } from "../Agents/DBAccess.js";

const fileKey = "quizzes";

//Create Quiz
export const  createQuiz = async (quizData) => {
    try{
        const quizzes = await readJson(fileKey);
        const newQuiz = {
            quizId : uuid(),
            title: quizData.title,
            level: quizData.level,
            status: "draft",
            createdAt: new Date().toISOString(),
            questions: quizData.questions.map(q => ({
                questionId: uuid(),
                text: q.text,
                type: q.type,
                options: q.options || [],
                answer: q.answer || ""
            }))
        };
    quizzes.push(newQuiz);
    await writeJson(fileKey, quizzes);
    console.log("quize created successfully");
    return newQuiz;
    } catch (error){
        throw error;
        }
};



//Get All quizzes 
export const getQuizzes = async () => {
    try{
        const quizzes = await readJson(fileKey);
        return quizzes;
    }catch (error){
        throw error;
        }
};