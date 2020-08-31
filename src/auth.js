import instance from "axios-instance";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

class Auth {
  constructor() {}

  login(email, password) {
    return new Promise((resolve, reject) => {
      const payload = {
        email: email,
        password: password,
      };

      instance
        .post("admin-login/", payload)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            let hash = sha256.create();
            hash.update(email + password);
            hash.hex();
            resolve(Cookies.set("authenticated", hash, { expires: 5 }));
          }
        })
        .catch((err) => {
          reject(console.log(err));
        });
    });
  }

  logout() {}

  isAuthenticated() {
    if (Cookies.get("admin")) {
      return true;
    }

    return false;
  }
}

export default new Auth();
