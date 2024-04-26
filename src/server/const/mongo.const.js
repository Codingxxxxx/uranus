const CollectionName = {
  User: 'users',
  Role: 'roles',
  OS: 'os',
  Color: 'colors',
  PCTag: 'pc_tags',
  Product: 'products',
  Order: 'orders',
  Customer: 'customers',
  Promotion: 'promotions'
};

const UserStatus = {
  Active: 'ACTIVE',
  Banned: 'BANNED'
};

const PromotionStatus = {
  Active: 'ACTIVE',
  InActive: 'INACTIVE'
};

const PromotionType = {
  Cash: '$',
  Percentage: '%'
};

module.exports = {
  CollectionName,
  UserStatus,
  PromotionStatus,
  PromotionType
};