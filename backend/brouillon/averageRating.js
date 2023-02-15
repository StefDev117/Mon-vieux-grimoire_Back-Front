// model de function averageRating

exports.likesSauces = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;
    //requette = mettre un like
  
    if (like === 1) {
      //mettre a jour la sauce concerné, ajouter l'user à l'array usersLiked avec $push, incrémenter les likes de 1 avec methode $inc, inclue dans mongodb
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: 1 } })
        .then(() => res.status(200).json("sauce liké !"))
        .catch(error => res.status(400).json({ error }));
    }
  
    //requette = mettre un dislike
    if (like === -1) {
      //maj la sauce, ajouter l'user à l'array usersDisliked, incrément les dislikes de 1
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } })
        .then(() => res.status(200).json("sauce disliké"))
        .catch(error => res.status(400).json({ error }));
    }
  
    //requette annuler son like/dislike
    if (like === 0) {
      //trouver la sauce
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          //si l'utilisateur était dans l'array userLiked, il annule son like
          if (sauce.usersLiked.includes(userId)) {
            //maj de la sauce, on enleve l'user de l'array $pull, et on décrémente les likes
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json("like retiré"))
              .catch(error => res.status(400).json({ error }));
          }
          //si l'user était dans l'array des dislike, il annule son dislike
          else if (sauce.usersDisliked.includes(userId)) {
            //maj de la sauce, on enleve l'user de l'array des dislike, décrément des dislike
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json("dislike retiré"))
              .catch(error => res.status(400).json({ error }));
          }
        })
        //sauce introuvable 404
        .catch(error => res.status(404).json({ error }));
    }
  };