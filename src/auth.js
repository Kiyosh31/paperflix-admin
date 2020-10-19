import instance from "axios-instance";
import Cookies from "js-cookie";

class Auth {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      const payload = {
        email: email,
        password: password,
      };

      instance
        .post("admin-login/", payload)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            Cookies.set(
              "authenticated",
              response.data.id_user + "|" + response.data.cookie,
              {
                expires: 1,
              }
            );
            resolve(true);
          } else if (response.status === 400) {
            reject(response);
          }
        })
        .catch((err) => {
          reject(console.log(err));
        });
    });
  }

  async logout() {
    const id_user = Cookies.get("authenticated").split("|")[0];
    const cookieValue = Cookies.get("authenticated").split("|")[1];

    instance
      .get(`admin-logout/${id_user}/`, {
        headers: {
          authorization: cookieValue,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("authenticated");
        }
      })
      .catch((err) => console.log(err));
  }

  isAuthenticated() {
    if (Cookies.get("authenticated")) {
      return true;
    }
    return false;
  }

  deleteCookie() {
    if (Cookies.get("authenticated")) {
      Cookies.remove("authenticated");
    }
  }
}

export default new Auth();
