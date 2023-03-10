import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/api/";
// const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";

// const API_URL_SESSION = "http://localhost:5000/api/session/";
// const API_URL_SESSION = "https://scouts-tunisienne.herokuapp.com/api/session/";

// Create new quiz
const createQuiz = async (quizData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("api/quiz/add", quizData, config);

  return response.data;
};

// Get quizzes
const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("api/quiz", config);
  return response.data;
};

// affect quiz to session
const affectQuizToSession = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idQuiz: data.idQuiz,
    idSession: data.idSession,
  };
  const response = await axios.patch("api/session/quiz/affect", body, config);
  console.log("data: ", response);

  return response.data;
};
// Delete quiz
const deleteQuiz = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("api/quiz/delete/" + data, config);

  return response.data;
};
const quizService = {
  createQuiz,
  getQuizzes,
  affectQuizToSession,
  deleteQuiz,
};

export default quizService;
