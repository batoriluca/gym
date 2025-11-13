// "use server"
import { getAxiosWithToken } from '@/axios/AxiosObj';

// Function to get user details
export async function getChats(id = "") {

    let url = 'chat';
    if (id != ""){
        url = `chat/${id}/`
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