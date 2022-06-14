import { API_URL } from "../config";

//selectors
export const getAllTables = ({tables}) => tables;
export const getTableById = ({tables}, id) => tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const updateTables = payload => ({type: UPDATE_TABLES, payload});

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};

export const updateTableRequest = (newTable) => {
  let id = newTable.id;
  let urlId = `${API_URL}/tables/${id}`;
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newTable }),
    };
    fetch(urlId, options)
    .then(() => dispatch(updateTables(newTable)))
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default tablesReducer;