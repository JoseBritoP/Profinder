const cleanArrayClientById = (client) => {
  return {
    id: client.id,
    name: client.name,
    email: client.email.toLowerCase(),
    image: client.image,
    phone: client.phone,
    rating: client.rating,
    description: client.description,
    genre: client.genre,
    ubication: client.ubication,
    post: client.Posts
  };
};

module.exports = cleanArrayClientById;