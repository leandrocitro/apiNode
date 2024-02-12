const path = require("path");


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.reolve(__dirname, "src", "datebase", "database.db")
    
  }, 
  useNullAsDefault:true;
}

};
