// module.exports.CONFIGURATIONS = {
//   DATABASE : {
//       PGSQL:{
//         host : process.env.PG_HOST,
//         user : process.env.PG_USER,
//         password : process.env.PG_PASSWORD,
//         database : process.env.PG_DATABASE,
//         port : process.env.PG_PORT,
//       }
//   }
// }

module.exports.CONFIGURATIONS = {
  DATABASE: {
    PGSQL: {
      HOST: process.env.PG_HOST,
      USER: process.env.PG_USER,
      PASSWORD: process.env.PG_PASSWORD,
      DATABASE: process.env.PG_DATABASE,
      PORT: process.env.PG_PORT || "5432",
    },
  },
};
