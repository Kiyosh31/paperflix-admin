import instance from "axios-instance";
import Cookies from "js-cookie";

class APICalls {
  constructor() {
    if (Cookies.get("authenticated")) {
      this.id_user = Cookies.get("authenticated").split("|")[0];
      this.cookieValue = Cookies.get("authenticated").split("|")[1];
      this.headers = { authorization: this.cookieValue };
      this.contentHeaders = {
        "Content-Type": "application/json",
        authorization: this.cookieValue,
      };
    }
  }

  checkCookie = () => {
    if (Cookies.get("authenticated")) {
      return true;
    } else {
      return false;
    }
  };

  searchCategories = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .post("category-search/", payload, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          return;
        })
        .catch((err) => reject(err));
    });
  };

  searchPapers = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .post("paper-search/", payload, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          return;
        })
        .catch((err) => reject(err));
    });
  };

  deletePaper = (id_paper) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .delete(`paper-delete/${id_paper}`, { headers: this.headers })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  updatePaper = (id_paper, payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .put(`paper-update/${id_paper}/`, payload, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  updateCategory = (id_category, payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .patch(`category-update/${id_category}/`, payload, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  createNewCategory = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .post("category-create/", payload, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  getAllPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .get("paper-list/", { headers: this.headers })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  getAllCategories = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .get("category-list/", {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  createNewPaper = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .post("paper-create/", payload, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };
}

export default new APICalls();
