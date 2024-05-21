require('dotenv').config();
const { AppConfig } = require('./../const');
const mongoose = require('mongoose');
const { RoleRepository } = require('../repos');
const { Slug } = require('../libs');

const roles = [
  {
    roleName: 'Limited'
  },
  {
    roleName: 'Admin'
  }
];

mongoose
  .connect(AppConfig.MONGO_URI)
  .then(() => {
    return RoleRepository
      .createRoles(
        roles.map(role => ({ roleName: role.roleName, slug: Slug.slugify(role.roleName) }))
      );
  })
  .then(() => {
    console.log('Seeding completed');
  })
  .catch((error) => {
    console.error('Error seeding: ', error);
  })
  .finally(async() => {
    await mongoose
      .disconnect()
      .catch(error => {
        console.error('Closing database connection failed: ', error);
      });
  });