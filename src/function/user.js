import { getAxiosWithToken } from '@/axios/AxiosObj';

// Function to get user details
export async function getUserDetails(id = "") {

    let url = 'user/details';
    if (id != "") {
        url = `user/details/${id}`
    }

    try {
        const response = await getAxiosWithToken({
            method: 'GET',
            url: url, // Adjust the API endpoint as needed
        });

        if (response.success == false) {
            return false;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while fetching user details.');
    }
}

export async function getUserWallet() {

    let url = 'user/wallet';

    try {
        const response = await getAxiosWithToken({
            method: 'GET',
            url: url, // Adjust the API endpoint as needed
        });

        return response;
    } catch (error) {
        console.error(error);
    }
}

// Function to update user details
export async function updateUserDetails(data) {
    try {
        const response = await getAxiosWithToken({
            method: 'PATCH',
            url: 'user/details', // Adjust the API endpoint as needed
            data,
        });
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while updating user details.');
    }
}

// Function to delete user profile
export async function deleteUserProfile() {
    try {
        const response = await getAxiosWithToken({
            method: 'DELETE',
            url: 'user/details', // Adjust the API endpoint as needed
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while deleting the user profile.');
    }
}
