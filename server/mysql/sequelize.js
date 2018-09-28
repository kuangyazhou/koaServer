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

// Quick example
sequelize.query("SELECT * FROM data").then(myTableRows => {
  console.log(myTableRows);
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

async function getUser() {
  const data = await User.findAll();
  // console.log(data);
  data.forEach(e => {
    console.log(e.dataValues);
  });
}

getUser();

// Project.findAll({
//   where: {
//     id: {
//       [Op.and]: { a: 5 }, // AND (a = 5)
//       [Op.or]: [{ a: 5 }, { a: 6 }], // (a = 5 OR a = 6)
//       [Op.gt]: 6, // id > 6
//       [Op.gte]: 6, // id >= 6
//       [Op.lt]: 10, // id < 10
//       [Op.lte]: 10, // id <= 10
//       [Op.ne]: 20, // id != 20
//       [Op.between]: [6, 10], // BETWEEN 6 AND 10
//       [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
//       [Op.in]: [1, 2], // IN [1, 2]
//       [Op.notIn]: [1, 2], // NOT IN [1, 2]
//       [Op.like]: "%hat", // LIKE '%hat'
//       [Op.notLike]: "%hat", // NOT LIKE '%hat'
//       [Op.iLike]: "%hat", // ILIKE '%hat' (case insensitive)  (PG only)
//       [Op.notILike]: "%hat", // NOT ILIKE '%hat'  (PG only)
//       [Op.overlap]: [1, 2], // && [1, 2] (PG array overlap operator)
//       [Op.contains]: [1, 2], // @> [1, 2] (PG array contains operator)
//       [Op.contained]: [1, 2], // <@ [1, 2] (PG array contained by operator)
//       [Op.any]: [2, 3] // ANY ARRAY[2, 3]::INTEGER (PG only)
//     },
//     status: {
//       [Op.not]: false // status NOT FALSE
//     }
//   }
// });

// 排序
// Project.findAll({order: 'title DESC'})

// Project.findAll({group: 'name'})
// yields GROUP BY name