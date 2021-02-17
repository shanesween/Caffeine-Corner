const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://image.freepik.com/free-vector/coffee-bag-mockup-white-foil-package-3d-pouch_83194-912.jpg',
    validate: {
      isUrl: true
    }
  },
  category: {
    type: Sequelize.ENUM('objet', 'sujet'),
    allowNull: false
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
