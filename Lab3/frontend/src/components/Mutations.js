const NEW_USER = gql`
  mutation newUser($username: String!, $password: String!) {
    newUser(username: $username, password: $password) {
      username
      password
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem(
    $name: String!
    $description: String!
    $price: Float!
    $image: String!
    $category: String!
    $quantity: Int!
  ) {
    addItem(
      name: $name
      description: $description
      price: $price
      image: $image
      category: $category
      quantity: $quantity
    ) {
      name
      description
      price
      image
      category
      quantity
    }
  }
`;

const ADD_FAVOURITE = gql`
  mutation addFavourite($userId: String!, $itemId: String!) {
    addFavourite(userId: $userId, itemId: $itemId) {
      userId
      itemId
    }
  }
`;

const ADD_CART = gql`
  mutation addCart($userId: String!, $itemId: String!) {
    addCart(userId: $userId, itemId: $itemId) {
      userId
      itemId
    }
  }
`;

const ADD_PURCHASED = gql`
  mutation addPurchased($userId: String!, $itemId: String!) {
    addPurchased(userId: $userId, itemId: $itemId) {
      userId
      itemId
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($_id: String!) {
    deleteItem(_id: $_id) {
      _id
    }
  }
`;

const DELETE_FAVOURITE = gql`
  mutation deleteFavourite($_id: String!) {
    deleteFavourite(_id: $_id) {
      _id
    }
  }
`;

const DELETE_CART = gql`
  mutation deleteCart($_id: String!) {
    deleteCart(_id: $_id) {
      _id
    }
  }
`;

const DELETE_PURCHASED = gql`
  mutation deletePurchased($_id: String!) {
    deletePurchased(_id: $_id) {
      _id
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $username: String
    $password: String
    $email: String
    $firstName: String
    $lastName: String
    $address: String
    $city: String
    $state: String
    $zip: String
    $phone: String
    $image: String
    $role: String
  ) {
    updateUser(
      _id: $_id
      username: $username
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      state: $state
      zip: $zip
      phone: $phone
      image: $image
      role: $role
    ) {
      _id
      username
      password
      email
      firstName
      lastName
      address
      city
      state
      zip
      phone
      image
      role
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem(
    $_id: String!
    $name: String
    $description: String
    $price: Float
    $image: String
    $category: String
    $quantity: Int
  ) {
    updateItem(
      _id: $_id
      name: $name
      description: $description
      price: $price
      image: $image
      category: $category
      quantity: $quantity
    ) {
      _id
      name
      description
      price
      image
      category
      quantity
    }
  }
`;

const UPDATE_FAVOURITE = gql`
  mutation updateFavourite($_id: String!, $userId: String, $itemId: String) {
    updateFavourite(_id: $_id, userId: $userId, itemId: $itemId) {
      _id
      userId
      itemId
    }
  }
`;

const UPDATE_CART = gql`
  mutation updateCart($_id: String!, $userId: String, $itemId: String) {
    updateCart(_id: $_id, userId: $userId, itemId: $itemId) {
      _id
      userId
      itemId
    }
  }
`;

const UPDATE_PURCHASED = gql`
  mutation updatePurchased($_id: String!, $userId: String, $itemId: String) {
    updatePurchased(_id: $_id, userId: $userId, itemId: $itemId) {
      _id
      userId
      itemId
    }
  }
`;

export {
  NEW_USER,
  ADD_ITEM,
  ADD_FAVOURITE,
  ADD_CART,
  ADD_PURCHASED,
  DELETE_USER,
  DELETE_ITEM,
  DELETE_FAVOURITE,
  DELETE_CART,
  DELETE_PURCHASED,
  UPDATE_USER,
  UPDATE_ITEM,
  UPDATE_FAVOURITE,
  UPDATE_CART,
  UPDATE_PURCHASED,
};
