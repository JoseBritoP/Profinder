const cleanArrayClient = (clients)=>{
  return clients.map((client)=>{
    return {
      id: client.id,
      name: client.name,
      email: client.email.toLowerCase(),
      image: client.image,
      genre: client.genre,
      ubication: client.ubication,
      Post: client.Posts
    };
  });
};

module.exports = cleanArrayClient;