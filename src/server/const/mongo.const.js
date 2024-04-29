const CollectionName = {
  User: 'users',
  Role: 'roles',
  OS: 'os',
  Color: 'colors',
  PCTag: 'pc_tags',
  Product: 'products',
  Order: 'orders',
  Customer: 'customers',
  Promotion: 'promotions',
  Transaction: 'transactions'
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

const TransactionStatus = {
  Pending: 'PENDING',
  Failed: 'FAILED',
  Completed: 'COMPLETEd'
};

module.exports = {
  CollectionName,
  UserStatus,
  PromotionStatus,
  PromotionType,
  TransactionStatus
};