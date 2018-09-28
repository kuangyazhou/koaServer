const Sequelize = require("sequelize");

const sequelize = new Sequelize("admin", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define(
  "data",
  {
    name: Sequelize.STRING,
    level: Sequelize.INTEGER
  },
  {
    timestamps: false //去除时间戳createAt和updateAt，不然会报错
  }
);

// Quick example
sequelize.query("SELECT * FROM data").then(myTableRows => {
  console.log(myTableRows);
});

async function getUser() {
  const data = await User.findAll();
  // console.log(data);
  data.forEach(e => {
    console.log(e.dataValues);
  });
}

getUser();
