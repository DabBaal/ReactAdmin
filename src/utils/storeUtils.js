import store from "store";

const USER_KEY = "userInfo";

const storeUtils = {
  saveUser: (user) => {
    store.set(USER_KEY, user);
  },

  getUser: () => {
    return store.get(USER_KEY) || {};
  },

  removeUser: () => {
    store.remove(USER_KEY);
  },
};

export default storeUtils;
