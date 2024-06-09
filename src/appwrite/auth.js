// import conf from "../conf/conf";
// import { Client, Account, ID } from "appwrite";

// export class AuthService {
//   client = new Client();
//   account;

//   constructor() {
//     this.client
//       .setEndpoint(conf.appwriteUrl)
//       .setProject(conf.appwriteProjectId);

//     this.account = new Account(this.client);
//   }

//   async createAccount({ email, password, name }) {
//     try {
//       const userAcoount = await this.account.create(
//         ID.unique(),
//         email,
//         password,
//         name
//       );

//       if (userAcoount) {
//         //call Another method ---> means if you scussesfully created account then login
//         return this.login({ email, password });
//       } else {
//         return userAcoount;
//       }
//     } catch (err) {
//       throw err;
//     }
//   }

//   async login({ email, password }) {
//     try {
//       return await this.account.createEmailSession(email, password);
//     } catch (err) {
//       throw err;
//     }
//   }

//   async getCurrentUser() {
//     try {
//       return await this.account.get();
//     } catch (err) {
//       console.log(err);
//       // return false;
//     }

//     return null;
//   }

//   async logout() {
//     try {
//       return this.account.deleteSessions();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// //object of AuthService
// const authService = new AuthService();

// export default authService;

import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
