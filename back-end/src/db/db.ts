import { Sequelize } from "sequelize"
import * as pkg from "../../package.json"

const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "")

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:4321/${databaseName}`,
  {
    logging: false,
  },
)

export default db
