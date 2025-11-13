import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { getAxiosWithOutToken } from '@/axios/AxiosObj';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { alertResponseMsgError } from "@/function/utilies";

const initialAccessToken = secureLocalStorage.getItem("access") || null;
const initialUserDetail = secureLocalStorage.getItem("userdetail") || [];
const initialIsLoggedIn = secureLocalStorage.getItem("isLIn") || false;
const initialMembership = secureLocalStorage.getItem("m") || false;
const initialProfileStatus = secureLocalStorage.getItem("p") || false;

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (data: any) => {
    try {
      const response = await getAxiosWithOutToken({
        method: 'POST',
        url: 'auth/login',
        data: data,
      });
      return response;
    } catch (error: any) {
      alertResponseMsgError(
        error?.response?.data?.msg || "Something went worng."
      );
    }
  }
);

export const userLogOut = createAsyncThunk(
  'auth/userLogOut',
  async () => {
    try {
      localStorage.clear();
      Cookies.remove('m');
      Cookies.remove('p');
      Cookies.remove('isLIn');
      secureLocalStorage.clear();
      window.location.reload();
    } catch (error: any) {
      alertResponseMsgError(
        error?.response?.data?.msg || "Something went worng."
      );
    }
  }
);

export const userCreate = createAsyncThunk(
  'auth/userCreate',
  async (data: any) => {
    try {
      const response = await getAxiosWithOutToken({
        method: 'POST',
        url: 'auth/create',
        data: data,
      });
      return response;
    } catch (error: any) {
      alertResponseMsgError(
        error?.response?.data?.msg || "Something went worng."
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: initialIsLoggedIn,
    accessToken: initialAccessToken,
    userDetails: initialUserDetail,
    profileStatus: initialProfileStatus,
    membership: initialMembership,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    setProfileStatus: (state, action) => {
      state.profileStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.membership = action.payload.m
          state.profileStatus = action.payload.p
          state.accessToken = action.payload.t
          state.isLoggedIn = true; // Update the state based on the login result

          Cookies.set('m', action.payload.m);
          Cookies.set('p', action.payload.p);
          Cookies.set('isLIn', "true");

          secureLocalStorage.setItem('p', action.payload.p);
          secureLocalStorage.setItem('m', action.payload.m);
          secureLocalStorage.setItem('isLIn', true);
          secureLocalStorage.setItem('userdetail', action.payload.userDetails);
          secureLocalStorage.setItem('access', action.payload.t);
          toast.success("Detaliile introduse sunt corecte");
        } else {
          // toast.error(action.payload.msg);
          // console.log(action.payload.msg)
        }
      })
      .addCase(userLogin.rejected, (state) => {
        // Handle rejected state if needed
        console.log("error:", state)
      })
      // .addCase(userCreate.pending, (state) => {
      //   // Handle pending state if needed
      // })
      .addCase(userCreate.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.membership = action.payload.m
          state.profileStatus = action.payload.p
          state.accessToken = action.payload.t
          state.isLoggedIn = true; // Update the state based on the login result

          Cookies.set('m', action.payload.m);
          Cookies.set('p', action.payload.p);
          Cookies.set('isLIn', "true");

          secureLocalStorage.setItem('p', action.payload.p);
          secureLocalStorage.setItem('m', action.payload.m);
          secureLocalStorage.setItem('isLIn', true);
          secureLocalStorage.setItem('userdetail', action.payload.userDetails);
          secureLocalStorage.setItem('access', action.payload.t);
        } else {
          toast.error(action.payload.msg);
        }

      })
    // .addCase(userCreate.rejected, (state) => {
    //   // Handle rejected state if needed
    //   console.log("error:", state)
    // });
  },
});

export const {
  setAccessToken,
  setUserDetails,
  setIsLoggedIn,
  setMembership,
  setProfileStatus,
} = authSlice.actions;

export default authSlice.reducer;
