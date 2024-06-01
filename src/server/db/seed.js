require('dotenv').config();
const { AppConfig } = require('./../const');
const mongoose = require('mongoose');
const { RoleRepository, UserRepository } = require('../repos');
const { Slug, Auth } = require('../libs');

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
  .then(async () => {
    const insertedRoles = await RoleRepository.createRoles(
      roles.map(role => ({ roleName: role.roleName, slug: Slug.slugify(role.roleName) }))
    );
    const [pass, salt] = await Auth.hashPassword('admin');
    await UserRepository.createUser({
      firstname: 'Admin',
      lastname: 'Admin',
      role: insertedRoles.find(r => r.roleName === 'Admin')._id,
      username: 'admin',
      password: pass,
      salt
    });
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