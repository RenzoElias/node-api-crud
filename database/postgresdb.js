const { Pool } = require('pg');
const config = require("./../config/config").CONFIGURATIONS.DATABASE.PGSQL;

console.log(config)

const pool = new Pool({
  host     : config.HOST,
  user     : config.USER,
  password : config.PASSWORD,
  database : config.DATABASE,
  port     : config.PORT
});

module.exports = {
  query: async function(text, params){
    return new Promise((resolve,reject)=>{
      pool.query(text, params,function(err,result){
        if(err){
          console.log(err);
          reject(err);}
        resolve(result)
      })
    })
  }
}