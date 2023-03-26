import { baseUrl } from "../../constants/baseUrl";

//---------post api-----------------

export const postApi = (data, url, token, isFormData, baseUrl_ = baseUrl) => {

    return fetch(
        baseUrl_ + url,
        {
            method: "POST",
            body: isFormData ? data : JSON.stringify(data),
            headers: {
                "Content-Type": isFormData ? 'multipart/form-data' : "application/json",
                "Authorization": token ? "Bearer " + token : null,
                // "Accept": "application/json"
            },
            credentials: "same-origin"
        }
    )
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //error if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((res) => res.json())
}



//--------------get api------------------


export default getApi = (url, token, baseUrl_ = baseUrl) => {

    return fetch(baseUrl_ + url,
        {
            headers: {
                "Authorization": token ? "Bearer " + token : null,
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }
    )
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //error if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((res) => res.json())
}














