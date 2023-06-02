
//function to calculate distance between 2 points

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    //multiply 1000 to get in meters
    return distance*1000;
}

