import { initializeApp } from 'firebase'
import { store } from './store'

const app = initializeApp({
  apiKey: 'AIzaSyAf3Fko63bdg3ZzeNOX7CNJ3qCg1MuGiV0',
  authDomain: 'fbapi-6abd9.firebaseapp.com',
  databaseURL: 'https://fbapi-6abd9.firebaseio.com',
  projectId: 'fbapi-6abd9',
  storageBucket: 'fbapi-6abd9.appspot.com',
  messagingSenderId: '141077793164'
})
const auth = app.auth()

function setUser (user) {
  return new Promise((resolve, reject) => {
    db.ref(`users/${user.uid}`).once('value')
      .then(snap => {
        store.commit('setUser', {
          'uid': user.uid,
          'email': snap.val().email,
          'role': snap.val().role,
          'isAuth': true
        })
        resolve()
      })
  })
}

export function appInit (router) {
  auth.onAuthStateChanged(user => {
    if (user && user.emailVerified) {
      setUser(user)
    }
  })
  return Promise.resolve()
};

export function login ({email, password}) {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user && user.emailVerified === true) {
          setUser(user) // set user resets the newly registered user.
          resolve(user)
        } else {
          reject(new Error('Verify email'))
        }
      })
      .catch(err => {
        reject(new Error(`Login error: ${err.code} - ${err.message}`))
      })
  })
};

export function register ({email, password, role}) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.sendEmailVerification()
          .then(() => {
            db.ref('users/' + user.uid).set({
              email: user.email,
              role
            })
            .then(resolve('Check email to verify account'))
          })
      })
      .catch(err => {
        reject(new Error(`${err.code} - ${err.message}`))
      })
  })
};

export function logout () {
  auth.signOut()
    .then(() => {
      store.commit('setUser', null)
    })
};

export const db = app.database()
export const vaultRef = db.ref('vault')
export const fieldsRef = db.ref('fields')
