import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, collection,doc, setDoc, query, orderBy, onSnapshot} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCCjTKtLhz1oL3dKHPPzDtUWyQabtJKJTA",
    authDomain: "e-clone-7f839.firebaseapp.com",
    projectId: "e-clone-7f839",
    storageBucket: "e-clone-7f839.appspot.com",
    messagingSenderId: "768835440342",
    appId: "1:768835440342:web:d9c53a04d92fd068e1c377",
    measurementId: "G-X2N3GE5SQX"
  };

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)

export const auth = getAuth(firebaseApp)

export const registerUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => resolve(userCredential.user))
    .catch(error => reject(error))
  })
}

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => resolve(userCredential.user))
    .catch(error => reject(error))
  })
}

export const addOrder = async (userId, paymentId, orderDetails) => {
  try {
    // const userRef = collection(db, "users", userId)
    const orderRef = collection(db, "users", userId, "orders")
    const paymentDoc = doc(orderRef,paymentId);
    await setDoc(paymentDoc, orderDetails)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getOrders = (userId) => {
  const ordersCollection = collection(db, "users", userId, "orders")
  const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"))
  let orders = []
  onSnapshot(ordersQuery, snapshot => {
    snapshot.forEach(doc => orders.push({id: doc.id, ...doc.data()}))
  })
  console.log("Orders",orders)

  return orders
}
