import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "./sign-in-form.styles.scss"
import axios from "axios";

const initialState = {
  isLoading: false,
  userInfo: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

interface UserLogin {
  email: string
  password: string
}

// const [myErrors, setErrors] = useState<any>(null);

export const currentUser = createAsyncThunk(
  "user/currentUser",
  async (name, thunkAPI) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/users/currentUser",
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk("user/login", async ({ email, password }: UserLogin, thunkAPI) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/users/signin",
      { email, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    console.log(err.response.data)
    return thunkAPI.rejectWithValue(
      <div className="alert">
        <h4>Ooops...</h4>
        <ul className="list-alert">
          {
            //@ts-ignore
            err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)
          }
        </ul>
      </div>);
  }
}
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(currentUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload.currentUser;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, {payload}) => {
      state.isLoading = false;
      //@ts-ignore
      state.error = payload;
    });
  },
});

// export const { getCurrentUser } = userSlice.actions;

export default userSlice.reducer;
