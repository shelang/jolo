import ApiClient from "./apiClient";

export const refreshToken = async () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  window.localStorage.setItem(
    "user",
    JSON.stringify({ ...user, token: user.refresh })
  );
  try {
    const res = await ApiClient("login/refresh", {
      method: "POST",
    });
    localStorage.setItem("user", JSON.stringify(res));
  } catch (err) {
    window.localStorage.removeItem("user");
    window.location.replace("/login");
  }
};
