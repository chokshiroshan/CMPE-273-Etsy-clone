const resolvers = {
  Query: {
    getUsers: () => users.find({}),
    getUser: (_, { _id }) => users.findById(_id),
    getItems: () => items.find({}),
    getItem: (_, { _id }) => items.findById(_id),
    getFavourites: () => favourites.find({}),
    getFavourite: (_, { _id }) => favourites.findById(_id),
    getCart: () => cart.find({}),
    getCartItem: (_, { _id }) => cart.findById(_id),
    getPurchased: () => purchased.find({}),
    getPurchasedItem: (_, { _id }) => purchased.findById(_id),
  },
  Mutation: {
    addUser: (
      _,
      {
        username,
        password,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        image,
        role,
      }
    ) => {
      const newUser = new users({
        username,
        password,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        image,
        role,
      });
      newUser.save();
      return newUser;
    },
    addItem: (_, { name, description, price, image, category, quantity }) => {
      const newItem = new items({
        name,
        description,
        price,
        image,
        category,
        quantity,
      });
      newItem.save();
      return newItem;
    },
    addFavourite: (_, { userId, itemId }) => {
      const newFavourite = new favourites({
        userId,
        itemId,
      });
      newFavourite.save();
      return newFavourite;
    },
    addCart: (_, { userId, itemId }) => {
      const newCart = new cart({
        userId,
        itemId,
      });
      newCart.save();
      return newCart;
    },
    addPurchased: (_, { userId, itemId }) => {
      const newPurchased = new purchased({
        userId,
        itemId,
      });
      newPurchased.save();
      return newPurchased;
    },
    deleteUser: (_, { _id }) => {
      users.findByIdAndDelete(_id);

      return users.findById(_id);
    },
    deleteItem: (_, { _id }) => {
      items.findByIdAndDelete(_id);

      return items.findById(_id);
    },
    deleteFavourite: (_, { _id }) => {
      favourites.findByIdAndDelete(_id);

      return favourites.findById(_id);
    },
    deleteCart: (_, { _id }) => {
      cart.findByIdAndDelete(_id);

      return cart.findById(_id);
    },
    deletePurchased: (_, { _id }) => {
      purchased.findByIdAndDelete(_id);

      return purchased.findById(_id);
    },
    updateUser: (
      _,
      {
        _id,
        username,
        password,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        image,
        role,
      }
    ) => {
      users.findByIdAndUpdate(_id, {
        username,
        password,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        image,
        role,
      });

      return users.findById(_id);
    },
    updateItem: (
      _,
      { _id, name, description, price, image, category, quantity }
    ) => {
      items.findByIdAndUpdate(_id, {
        name,
        description,
        price,
        image,
        category,
        quantity,
      });

      return items.findById(_id);
    },
    updateFavourite: (_, { _id, userId, itemId }) => {
      favourites.findByIdAndUpdate(_id, {
        userId,
        itemId,
      });

      return favourites.findById(_id);
    },
    updateCart: (_, { _id, userId, itemId }) => {
      cart.findByIdAndUpdate(_id, {
        userId,
        itemId,
      });

      return cart.findById(_id);
    },
    updatePurchased: (_, { _id, userId, itemId }) => {
      purchased.findByIdAndUpdate(_id, {
        userId,
        itemId,
      });

      return purchased.findById(_id);
    },
  },
};
