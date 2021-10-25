import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
// import styled from 'styled-components';
import { getPlayers } from '../api/data/playerData';
import 'firebase/auth';
import PlayerForm from '../components/PlayerForm';
import Navigation from '../components/Navigation';
import Routes from '../routes';
import SignIn from '../views/SignIn';

// const Container = styled.div`
// width: 60%;
// margin: auto;
// padding: 50px 0;
// h1 {
//   color: white;
//   text-align: center;
//   font-size: 64px;
//   font-weight: 400;
// }
// h3 {
//   color: lightgrey;
//   text-align: center;
// }
// h4 {
//   color: lightgrey;
//   text-transform: uppercase;
//   font-size: medium;
// }
// `;

function Initialize() {
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getPlayers(false).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Navigation />
          <PlayerForm
            obj={editItem}
            setPlayer={setPlayers}
            setEditItem={setEditItem}
          />
          <Routes
            players={players}
            setPlayers={setPlayers}
          />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </div>
  );
}

export default Initialize;
