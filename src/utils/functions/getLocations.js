import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';


export const getLocation = () => {

    Geolocation.getCurrentPosition(
        (position) => {
            // alert(JSON.stringify(position, null, 2))
            console.log("COORD", JSON.stringify(position, null, 2));

            // setCurrentCoord({ lat: position.coords.latitude, long: position.coords.longitude });

            Geocoder.from({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
                .then(json => {

                    var location = json.results[0].geometry.location;


                    //setting current address for later use
                    // setCurrentLocation(json.results[0].formatted_address);

                    console.log("\n\n\ADDRESS---->", JSON.stringify(location, null, 2), "\n\n\n");
                })
                .catch(error => {
                    console.log(JSON.stringify(error, null, 2))
                }
                );

        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

}

