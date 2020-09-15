import instance from "axios-instance";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

class Auth {
  login(email, password) {
    return new Promise((resolve, reject) => {
      const payload = {
        email: email,
        password: password,
      };

      instance
        .post("admin-login/", payload)
        .then((response) => {
          if (response.status === 200) {
            let hash = sha256.create();
            hash.update(email + password);
            hash.hex();
            resolve(Cookies.set("admin", hash, { expires: 1 }));
          }
        })
        .catch((err) => {
          reject(console.log(err));
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      Cookies.remove("admin");
      if (!this.isAuthenticated()) {
        resolve(true);
      }

      reject(false);
    });
  }

  isAuthenticated() {
    if (Cookies.get("admin")) {
      return true;
    }

    return false;
  }
}

export default new Auth();
