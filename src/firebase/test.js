// import {firestore} from './firebase.utils';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {collection, addDoc} from 'firebase/firestore/lite'



const firestore = firebase.firestore();
firestore.collection('users').doc('id').collection('cartItems').doc('id');
firestore.doc('/users/id/cartItems/id')
firestore.collection('/users/id/cartItems/id')

