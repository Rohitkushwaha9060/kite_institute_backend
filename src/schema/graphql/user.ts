const userTypeDef = `#graphql
  type User {
    id: ID!
    name: String
    email: String
    avatar: String
    isAdmin: Boolean
    isActive: Boolean
    role: String
    createdAt: String
    updatedAt: String
  }



`;

export default userTypeDef;
