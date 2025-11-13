import { getAxiosWithToken } from '@/axios/AxiosObj';
import secureLocalStorage from 'react-secure-storage';
import { setAccessToken } from '@/store/slices/AuthSlice';

// Function to get user details
export async function getRefreshToken() {

    try {
        const response = await getAxiosWithToken({
            method: 'GET',
            url: 'auth/token', // Adjust the API endpoint as needed
        });

        if (response.success){
            await secureLocalStorage.setItem('access', response.t);
        }else{
            await localStorage.clear();
            await Cookies.remove('m');
            await Cookies.remove('p');
            await Cookies.remove('isLIn');
            await secureLocalStorage.clear();
            await window.location.reload();
        }

    } catch (error) {
        console.error(error);
    }

}