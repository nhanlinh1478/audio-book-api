// class User {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }

//   Login(email, password) {
//     //
//     const buildInEmail = "sysadmin";
//     const buildInPassword = "$1$.NgB/jXO$1KO4rIF9pjoD0vWh7.F1E/";
//     if (!validEmail(email))
//       return json({
//         message: "Email error",
//       });

//     if (email == buildInEmail && buildInPassword == bcrypt(password)) {
//       return json({
//         message: "Login success",
//       });
//     } else {
//       return json({
//         message: "Login error",
//       });
//     }
//   }
// }
