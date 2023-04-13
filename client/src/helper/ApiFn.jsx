import axios from "axios";

//base url
// axios.defaults.baseURL = "https://lc-auth-api.onrender.com/";
axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.baseURL = "https://api-lc-auth.onrender.com/";

/** Verify username */
export const VerifyUser = async (username) => {
  try {
    const data = await axios.post("/api/authenticate", { username });
    return Promise.resolve(data);
  } catch (error) {
    const err = { error: "Username Doesn't Exist ...!" };
    return Promise.reject(err);
  }
};

/** Login user */
export const loginUser = async (cred) => {
  const { username, password } = cred;
  try {
    const data = await axios.post("/api/login", {
      username,
      password,
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Get user detail for profile page */
export const getUserDetail = async (username) => {
  try {
    const data = await axios.get(`/api/user/${username}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Update data from profile page */
export const updatedUser = async (updatedData) => {
  const token = await localStorage.getItem("token");

  if (!token) return Promise.reject({ error: "Not Authenticated...!" });

  try {
    const data = await axios.put("/api/updateuser", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Regisyter user */
export const RegisterUser = async (credentials, emailData) => {
  try {
    const { data } = await axios.post("/api/register", credentials);

    //sending mail to registered email
    const emaildata = await axios.post("/api/registerMail", {
      username: emailData.username,
      userEmail: emailData.email,
      text: `
        Dear ${emailData.username},
        ${"\n"}
        Thank you for registering on our website! We are excited to have you join our community. 
        ${"\n"}
        If you have any questions or need assistance with anything, please don't hesitate to contact us. We are always happy to help.
        ${"\n"}
        Thank you again for registering with us. We look forward to hearing from you soon!
        ${"\n"}
        Sincerely,
        ${"asda"}`,
      subject: `Welcome ${emailData.username}`,
    });

    return Promise.resolve(data, emaildata);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Send OTP to mail */
export const SendOTP = async (username) => {
  try {
    const { data } = await axios.get(`api/generateOTP?username=${username}`);

    //geting userEmail from username
    let {
      data: { email },
    } = await getUserDetail(username);

    //sending otp to mail
    await axios.post("/api/registerMail", {
      username: username,
      userEmail: email,
      text: `Code : ${data?.code}`,
      subject: `hy ${username}`,
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Verify OTP */
export const VerifyPassOTP = async ({ username, OTP }) => {
  try {
    const data = axios.get(`/api/verifyOTP?code=${OTP}&username=${username}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Change Password */
export const ChnagePass = async ({ username, password }) => {
  try {
    const { data } = await axios.put("/api/resetPassword", {
      username,
      password,
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
