
require('dotenv').config()
const { initializeApp } = require('firebase/app')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_ADMIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()


const uploadToFirebase = async (firebaseDirectoryName, file) => {

  const storageRef = ref(storage, `${firebaseDirectoryName}/${file.originalname}`)

  const metadata = {
    contentType: file.mimetype,
  }


  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)
  const ResumedownloadUrl = await getDownloadURL(snapshot.ref)
  // console.log('URlFrom FIrebase',ResumedownloadUrl)
  return ResumedownloadUrl


}

module.exports = { uploadToFirebase }