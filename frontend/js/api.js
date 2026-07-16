// =====================================
// API Helper Functions
// =====================================


// GET Request

async function apiGet(endpoint) {

    try {

        const response = await fetch(

            CONFIG.API_URL + endpoint,

            {

                method: "GET",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + getToken()

                }

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: "Unable to connect to server."

        };

    }

}



// POST Request

async function apiPost(endpoint, body = {}) {

    try {

        const response = await fetch(

            CONFIG.API_URL + endpoint,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + getToken()

                },

                body: JSON.stringify(body)

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: "Unable to connect to server."

        };

    }

}



// PUT Request

async function apiPut(endpoint, body = {}) {

    try {

        const response = await fetch(

            CONFIG.API_URL + endpoint,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + getToken()

                },

                body: JSON.stringify(body)

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: "Unable to connect to server."

        };

    }

}



// DELETE Request

async function apiDelete(endpoint) {

    try {

        const response = await fetch(

            CONFIG.API_URL + endpoint,

            {

                method: "DELETE",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + getToken()

                }

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: "Unable to connect to server."

        };

    }

}



// Upload File

async function apiUpload(endpoint, formData) {

    try {

        const response = await fetch(

            CONFIG.API_URL + endpoint,

            {

                method: "POST",

                headers: {

                    "Authorization": "Bearer " + getToken()

                },

                body: formData

            }

        );

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: "Upload Failed"

        };

    }

}