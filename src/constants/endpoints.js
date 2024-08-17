export const TRIVIA_BASE_URL = "https://opentdb.com/api.php?";

export const PARAMS = {
  AMOUNT: `amount=`,
  TYPE: `type=`,
};

export const API_ENDPOINTS = {
  GET_QUESTIONS: (amount = 10, type='multiple') => `${TRIVIA_BASE_URL}${PARAMS.AMOUNT}${amount}&${PARAMS.TYPE}${type}`,
};
