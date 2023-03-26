// import AudioRecorderPlayer, {
//     AVEncoderAudioQualityIOSType,
//     AVEncodingOption,
//     AudioEncoderAndroidType,
//     AudioSet,
//     AudioSourceAndroidType,
// } from 'react-native-audio-recorder-player';





// export const onStartRecord = async (audioRecorderPlayer, setRecordSecs, setRecordTime) => {

//     const path = null;
//     const audioSet = {
//         AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//         AudioSourceAndroid: AudioSourceAndroidType.MIC,
//         AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//         AVNumberOfChannelsKeyIOS: 2,
//         AVFormatIDKeyIOS: AVEncodingOption.aac,
//     };
//     console.log('audioSet', audioSet);
//     const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);

//     audioRecorderPlayer.current.addRecordBackListener((e) => {

//         setRecordSecs(e.currentPosition);
//         setRecordTime(audioRecorderPlayer.current.mmssss(
//             Math.floor(e.currentPosition),
//         ))

//     });

// };

// export const onStopRecord = async (audioRecorderPlayer, setRecordSecs, setPath) => {
//     const result = await audioRecorderPlayer.current.stopRecorder();
//     audioRecorderPlayer.current.removeRecordBackListener();
//     setPath(result);
//     setRecordSecs(0);
// };


// export const onStartPlay = async (audioRecorderPlayer, setDuration, setPlayTime, setCurrentDurationSec, setCurrentPositionSec) => {
//     console.log('onStartPlay');
//     const path = null
//     const msg = await audioRecorderPlayer.current.startPlayer(path);
//     audioRecorderPlayer.current.setVolume(1.0);
//     console.log(msg);
//     audioRecorderPlayer.current.addPlayBackListener((e) => {
//         if (e.currentPosition === e.duration) {
//             console.log('finished');
//             audioRecorderPlayer.current.stopPlayer()
//         }

//         setCurrentPositionSec(e.currentPosition);
//         setCurrentDurationSec(e.duration);
//         setPlayTime(audioRecorderPlayer.current.mmssss(
//             Math.floor(e.currentPosition),
//         ));
//         setDuration(audioRecorderPlayer.current.mmssss(Math.floor(e.duration)));
//     });
// };


// export const onPausePlay = async (audioRecorderPlayer) => {
//     audioRecorderPlayer.current.pausePlayer();
// };

// export const onStopPlay = async (audioRecorderPlayer) => {
//     console.log('onStopPlay');
//     audioRecorderPlayer.current.stopPlayer();
//     audioRecorderPlayer.current.removePlayBackListener();
// }