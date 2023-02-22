const Book = require("../models/Book");
const fs = require("fs"); //fs = file system

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject.id;
  delete bookObject.userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré ! " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject.userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res
          .status(401)
          .json({ message: "Vous n'êtes pas autorisé à modifier ce livre." });
      } else {
        if (bookObject.imageUrl) {
          const filename = book.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => updateNewBook());
        } else {
          updateNewBook();
        }

        // Ici je met ma fonction finale update dans une autre fonction, car je veux la passer dans 2 cas
        //(voir ci dessus), si je met à jour mon image(bookObject.imageUrl)
        // l'ancienne image sera suprrimé du dossier, autrement je passe juste ma fonction
        function updateNewBook() {
          Book.updateOne(
            { _id: req.params.id },
            { ...bookObject, _id: req.params.id }
          )
            .then(() => {
              res.status(200).json({
                message:
                  "Objet modifié avec succès et images locales supprimée !",
              });
            })
            .catch((err) => res.status(401).json({ err }));
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];

        fs.unlink(`images/${filename}`, () =>
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Livre supprimé !" }))
            .catch((err) => res.status(400).json({ err }))
        );
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: "erreur" }));
};

exports.getBestBooks = (req, res, next) => {
  Book.find()
    .then((books) => {

      //cette constante classe mes books avec sort(de façon décroissante), puis garde les 3 books les mieux notés (avec splice(0, 3))
      const bestBooksClassed = [...books].sort((a, b) => b.averageRating - a.averageRating 
      ).splice(0, 3);
    
      res.status(200).json(bestBooksClassed);
    })
    .catch((error) => res.status(400).json({ error }));
};
