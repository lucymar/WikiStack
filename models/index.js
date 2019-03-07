const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: true,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'My topic',
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'closed',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Page.beforeCreate((pageInstance, optionsObj) => {
  const postTitle = pageInstance.title;
  const slugGenerator = (title) => {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  pageInstance.slug = slugGenerator(postTitle);
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});



module.exports = { db, Page, User };
