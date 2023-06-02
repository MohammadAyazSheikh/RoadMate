import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';


export const addDocument = (dataToPost: any, documentName: string) => {

    console.log(JSON.stringify(dataToPost, null, 2));
    // dispatch(updateUserSuccess(dataToPost));
    //saving in firebase
  return  firestore()
        .collection('Users')
        .add(dataToPost)
}
