import { getAxiosWithToken } from '@/axios/AxiosObj';

// Function to get user details
export async function getPosts(id = "") {

    let url = 'post';
    if (id != ""){
        url = `post/${id}/`
    }

    try {
        const response = await getAxiosWithToken({
            method: 'GET',
            url: url, // Adjust the API endpoint as needed
        });

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while fetching user details.');
    }
}

export async function getPostDetails(id = "") {

    let url = 'post';
    if (id != ""){
        url = `post/${id}`
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

export async function PostLike(id = "") {

    let url = 'post';
    if (id != ""){
        url = `post/${id}/like`
    }

    try {
        const response = await getAxiosWithToken({
            method: 'POST',
            url: url, // Adjust the API endpoint as needed
        });
        if (response.success == false) {
            return false;
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while fetching user details.');
    }
}

export async function PostDelete(id = "") {

    let url = 'post';
    if (id != ""){
        url = `post/${id}`
    }

    try {
        const response = await getAxiosWithToken({
            method: 'DELETE',
            url: url, // Adjust the API endpoint as needed
        });
        // if (response.success == false) {
        //     return false;
        // }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong while fetching user details.');
    }
}
