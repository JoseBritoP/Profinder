import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDd2Tf-ePCljFYbnsj_TSM2VbgJ5GRwVBo",
  authDomain: "react-imagenes-profinder.firebaseapp.com",
  projectId: "react-imagenes-profinder",
  storageBucket: "react-imagenes-profinder.appspot.com",
  messagingSenderId: "972652140693",
  appId: "1:972652140693:web:3ce143c40f7f3fc4c6639c",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(files) {
  const urls = [];
  for (const file of files) {
    const fileName = v4() + ".jpg";
    const storageRef = ref(storage, "registros/" + fileName); // Update the storage reference to the "posteos" folder
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}
export async function uploadFiles2(files) {
  const urls = [];
  for (const file of files) {
    const fileName = v4() + ".jpg";
    const storageRef = ref(storage, "posteos/" + fileName); // Update the storage reference to the "posteos" folder
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}
export async function uploadFiles3(files) {
  const urls = [];
  for (const file of files) {
    const fileName = v4() + ".jpg";
    const storageRef = ref(storage, "cliente/" + fileName);
    // Specify the contentType as "image/jpeg"
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }
  return urls;
}
