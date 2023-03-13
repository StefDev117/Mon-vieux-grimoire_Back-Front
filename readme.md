

1 - Clonez le repos depuis un nouveau dossier avec git clone https://github.com/StefDev117/Mon-vieux-grimoire_Back-Front.git;

2 - Tapez cd backend => npm install;

3 - Tapez cd frontend => npm install, attendez la fin de l'installation;

4 - Vous devrez créer un cluster MongoDb, puis ajoutez les informations ci dessous à la place des miennes qui sont stockées dans un fichier .env .
Dans backend créer un fichier .env avec ces données:
USER=votreUserMongoDb
PASSWORD=votrePassword
COMPLETEROUTE=mongodb+srv://user:password@mon-vieux-grimoire.nujfefc.mongodb.net/?retryWrites=true&w=majority

5 - Dans le backend, créez un dossier image, sinon vous aurez une erreur pour l'ajout ou l'update d'un book;

6 - Depuis la racine du dossier, cd backend => yarn dev/npm run dev (connexion avec le serveur et l'API);

7 - Ouvrez un autre onglet dans le terminal, cd frontend => yarn start/npm run start;

PS: j'ai mis un gitignore pour les images, vous recevrez les travaux créés, mais pas l'image.