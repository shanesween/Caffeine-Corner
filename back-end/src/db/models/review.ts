import * as Sequelize from "sequelize"
import db from "../db"

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  }
})

export default Review
