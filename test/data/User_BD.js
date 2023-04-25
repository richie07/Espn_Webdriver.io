class User_BD {
    constructor() {
      const randomNumber = Math.floor(Math.random() * 100000 + 1);
      this.firstName = "Francisco";
      this.lastName = "Pinedo";
      this.email = `${randomNumber}test@dgmailxtest.com`;
      this.password = "Lima2023";
    }
  
    getFirstName() {
      return this.firstName;
    }
  
    getLastName() {
      return this.lastName;
    }
  
    getEmail() {
      return this.email;
    }
  
    getPassword() {
      return this.password;
    }
  }
  module.exports = new User_BD();