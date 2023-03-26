// import * as ImagePicker from 'react-native-image-picker';
import ImagePickerMultiple from 'react-native-image-crop-picker';


///-----for single image selection---------

// export const selectPicture = (setImageUri) => {
//     let options = {
//         storageOptions: {
//             skipBackup: true,
//             path: 'images',
//         },
//     };

//     ImagePicker.launchImageLibrary(options, async res => {
//         console.log('Response = ', res);

//         if (res.didCancel) {
//             console.log('User cancelled image picker');
//         } else if (res.error) {
//             console.log('ImagePicker Error: ', res.error);
//         } else if (res.customButton) {
//             console.log('User tapped custom button: ', res.customButton);
//             alert(res.customButton);
//         } else {
//             let source = res;
//             setImageUri(source.assets[0].uri);
//         }
//     });
// };




///-----for multiple image selection---------
export const pickMultipleImage = (setImageList, imageList) => {
    ImagePickerMultiple.openPicker({
        multiple: true,
        mediaType: "photo",
        cropping: true
    }).then(images => {
        setImageList([...imageList, ...images])
    }).catch(err => { console.log(err) });
}