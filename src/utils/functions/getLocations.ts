import Geolocation from 'react-native-geolocation-service';
import { apiKeyGeopyfy } from '../../constants/urls';
import { requestLocationPermission } from '../functions/permissions';
import { locationType } from '../../constants/types/sharedTypes';


//for getting current location with text address
type callbackType = (locationObject: locationType) => void;

export const getCurrentLocation = (callBack: callbackType) => {

    requestLocationPermission().then(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                // console.log("COORD", JSON.stringify(position, null, 2));

                //
                const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=${apiKeyGeopyfy}`


                return fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        const location = {
                            longitude: result.features[0].properties?.lon,
                            latitude: result.features[0].properties?.lat,
                            textAddr: result.features[0].properties?.formatted,
                        }
                        callBack(location);
                        console.log(JSON.stringify(location, null, 2))
                    })
                    .catch(err => { console.error("goeopyfy autocomplete error") });

            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    })


}



//for getting text address from long lat

type coord = {
    longitude: number,
    latitude: number,
}
export const getAddrFromCord = ({ latitude, longitude }: coord) => {

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKeyGeopyfy}`


    return fetch(url)
        .then(response => response.json())
        .then(result => {
            const location = {
                longitude,
                latitude,
                textAddr: result.features[0].properties?.formatted,
            }

            console.log(JSON.stringify(location, null, 2));
            return location
        })
        .catch(err => { console.error("goeopyfy autocomplete error") });

}

//for getting autocomplete
export const autoComplete = (text: string) => {

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&limit=10&lang=en&apiKey=${apiKeyGeopyfy}`

    return fetch(url)
        .then(response => response.json())
        .catch(err => { console.error("goeopyfy autocomplete error") });

}


