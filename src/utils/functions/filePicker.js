import DocumentPicker, { types, pick } from 'react-native-document-picker';
import uuid from 'react-native-uuid'
export const pickFile = async (setFileList) => {
    try {
        const response = await DocumentPicker.pick({
            presentationStyle: 'formSheet',
            allowMultiSelection: false,
            // type: [DocumentPicker.types.video,]
        });
        setFileList(prev => [{ name: response[0].name, uri: response[0].uri, id: uuid.v4(), type: response[0].type }, ...prev]);
    } catch (err) {
        console.log(err)
    }
}


export const pickSingleFile = async (setFilePath) => {
    try {
        const response = await DocumentPicker.pick({
            presentationStyle: 'formSheet',
            allowMultiSelection: false,
            type: [DocumentPicker.types.allFiles]
        });

        console.log(JSON.stringify(response, null, 2))
        setFilePath(response[0])
        // setFilePath({ name: response[0].name, uri: response[0].uri, id: uuid.v4(), type: response[0].type })
    } catch (err) {
        console.log(err)
    }
}