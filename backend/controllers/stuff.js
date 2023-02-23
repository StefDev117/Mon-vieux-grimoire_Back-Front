const Book = require("../models/Book");
const fs = require("fs"); //fs = file system
const { log } = require("console");

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
    
    // console.log(bookObject);

  delete bookObject.userId;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      console.log(40);
      console.log(bookObject);
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

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: "erreur" }));
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

exports.getBestBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      res
        .status(200)
        .json(
          [...books]
            .sort((a, b) => b.averageRating - a.averageRating)
            .splice(0, 3)
        );
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.postRating = (req, res, next) => {

  const newRating = { ...req.body };
  newRating.grade = newRating.rating;
  delete newRating.rating;
  //ici j'ajoute la valeur grade, car les datas envoyées par le front ne sont pas celles attendues
  // et rajoute grade attendue à la place de rating
  // userId: , rating:  à la place de userId: , grade
  const test = "test";

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      console.log(newRating);
      const cloneBook = {...book._doc};
      console.log(cloneBook);
      cloneBook.ratings = [{...newRating}, ...book.ratings];
      console.log(cloneBook);
      console.log("cloneBook");
      Book.updateOne(
        { _id: req.params.id },
        {...cloneBook, _id:req.params.id}
      )
        .then(() => {
          console.log("updateOne appelé");
          res.status(200).json({
            message: "Objet modifié avec succès et images locales supprimées !",
          });
        })
        .catch((err) => {
          console.log("erreur 401");
          res.status(401).json({ err: "erreure dans le process" });
        });
    })
    .catch((error) => {
      console.log("erreur 400 encore");
      res.status(400).json({ error });
    });
};
