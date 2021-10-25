import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/players/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => {
          getPlayers().then(resolve);
        });
    })
    .catch(reject);
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/players/${firebaseKey}.json`)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

export { getPlayers, createPlayer, deletePlayer };
