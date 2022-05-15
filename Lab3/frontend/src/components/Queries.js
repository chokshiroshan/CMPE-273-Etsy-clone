const GET_USERS = gql`
  query getUsers {
    getUsers {
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

const GET_USER = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
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

const GET_ITEMS = gql`
  query getItems {
    getItems {
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

const GET_ITEM = gql`
  query getItem($_id: String!) {
    getItem(_id: $_id) {
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

const GET_FAVOURITES = gql`
  query getFavourites {
    getFavourites {
      _id
      userId
      itemId
    }
  }
`;

const GET_FAVOURITE = gql`
  query getFavourite($_id: String!) {
    getFavourite(_id: $_id) {
      _id
      userId
      itemId
    }
  }
`;

const GET_CART = gql`
  query getCart {
    getCart {
      _id
      userId
      itemId
    }
  }
`;

const GET_CART_ITEM = gql`
  query getCartItem($_id: String!) {
    getCartItem(_id: $_id) {
      _id
      userId
      itemId
    }
  }
`;

const GET_PURCHASED = gql`
  query getPurchased {
    getPurchased {
      _id
      userId
      itemId
    }
  }
`;

const GET_PURCHASED_ITEM = gql`
  query getPurchasedItem($_id: String!) {
    getPurchasedItem(_id: $_id) {
      _id
      userId
      itemId
    }
  }
`;

export {
  GET_USERS,
  GET_USER,
  GET_ITEMS,
  GET_ITEM,
  GET_FAVOURITES,
  GET_FAVOURITE,
  GET_CART,
  GET_CART_ITEM,
  GET_PURCHASED,
  GET_PURCHASED_ITEM,
};
