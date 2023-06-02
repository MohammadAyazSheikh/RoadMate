export type userType = {
    userId: string | null,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    gender: "male" | "female",
    dob: Date | null,
    phoneNumber: string | null,
    profileImage: string | null
}


export type locationType = {
    longitude?: number,
    latitude?: number,
    textAddr?: string
}

export type rideType = {
    id?: string,
    rider: userType,
    from: locationType,
    to: locationType,
    time: Date,
    date: Date,
    totalSeats: number,
    availableSeats: number
    distance: number,
    price: number,
}