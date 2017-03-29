# Specifications
*__Note__: Tree, trees, treees, everything may be tree*  
*__Note2__: Sometimes it's written in french, sometimes in english; désolé*  
*__Note3__: This is a kind of draft, more or less; I primarly use it to put down what is in my head*
*__Note4__: You can read this document as if it were written in chronological order, it is*

## Project's logical blocks
### Definition
```
+ Éléments logiques du projet
|--- Serveur web
|--- Base de données
|--- Interface web
|--- Modèles d'arbres de tests
`--- Editeur de XML
```

### Block's roles
```
+ rôle(s) des éléments logiques du projet
|--+ rôle du serveur web
|  |--+ accéder en lecture et écriture à la base de données
|  |  |--- gestion du stockage des arbres de tests
|  |  `--- gestion du stockage des procédures de tests générées
|  |--+ gérer les modèles de l'arbre de tests
|  |  |--- gérer la validation de modèles d'arbres (uploadé par le testeur)
|  |  |--- gérer la génération des id uniques de tests (pour gérer les MAJ d'arbres)
|  |  `--+ gérer les différentes versions d'un arbre
|  |     |--- ajout
|  |     |--- suppression
|  |     `--- lecture
|  |--+ gérer les procédures (linéaires) de tests
|  |  |--- générer des procédures (linéaires) de tests à partir d'arbres de tests
|  |  |--- sauvegarde de procédures
|  |  |--- suppression de procédures
|  |  `--+ mise à jour de procédures
|  |     |--- avancée dans la procédure de tests par le testeur (cas d'utilisation classique)
|  |     `--- mise à jour d'anciennes procédures depuis de nouvelles versions de l'arbre
|  `--- servir l'interface graphique en HTTP
|--+ rôle de la base de données
|  |--- stocker les différentes versions des arbres de tests
|  `--- stocker les différentes procédures (sessions) de tests
|--+ rôle de l'interface web
|  `--+ permettre au testeur d'intéragir avec le serveur de tests
|     |--+ gérer les modèles d'arbres
|     |  |--- lecture
|     |  |--+ ajout
|     |  |  |--- upload
|     |  |  `--- validation de la structure de l'arbre
|     |  `--- suppression
|     `--+ gérer les procédures de tests par machines à tester
|        |--- afficher la liste des procédures de tests existantes
|        |--- créer une procédure de tests se basant sur un arbre uploadé
|        `--- dupliquer et mettre à jour une procédure de tests se basant sur une procédure (session)
|             de tests déjà existante et sur une nouvelle version de l'arbre de tests
|--+ rôle des modèles d'arbres de tests
|  |--- contenir la définition de tous les tests dans une structure de données
|  `--- permettre de générer une procédure de tests (linéaire) à partir de l'arbre
`--+ editeur de XML
   `--- permettre de structurer et d'éditer facilement un arbre de tests
```

## Server repository architecture
```
+ server architecture (repository architecture)
|--+ config/ (configuration files)
|  |--- *.config.json (project configuration)
|  `--- *.config.json.example (project configuration example)
|  `--+ system/
|     `--- *.service (linux systemd config)
|--+ libraries/
|  `--- *.js (libraries initialization and configuration)
|--- models/ (database tables/documents models)
|--+ controllers/
|  `--- modules*.js (entry points, by functionnality; module = set of functionnalities)
|--+ managers/ (a manager manages a minimalist module, which gives access to a set of functionnalities)
|  `--- *.js (minimalist modules)
|--+ routes/
|  `--- *.js (redirects to a funcionnality via the modules controllers, or load html views)
`--+ views/
   |--- html
   |--- css
   |--- js
   |--- data (images, etc)
   `--- template (if we need to use an html template renderer)
```

## WBS - Work Breakdown Structure

On doit tracer l'arbre du travail a effectuer
On peut appeller cet arbre le WBS, Work Breakdown Structure
Le point d'entrée dans l'arbre est le nom du projet lui-même, htest
Pour que cet arbre soit complet il faut tracer TOUT ce qui doit être effectué lors du développement

```
+ htest
|--+ back end (serve and process all needed data for the front end)
|  |--+ web server (serve front end to web browsers)
|  |  |--+ emerge from scratch
|  |  |  |--- setup npm package
|  |  |  |--- setup repository architecture
|  |  |  `--- setup express
|  |  `--+ setup routes
|  |     |--- pure http routes
|  |     `--- socket.io routes (events)
|  |--+ database
|  |  |--- setup database configuration
|  |  `--- create models/documents structure
|  `--+ controllers
|     |--+ tests trees library
|     |  |--+ add new test tree in library
|     |  |  |--- validate tree structure
|     |  |  |--- fill empty tests ids
|     |  |  |--+ save updated tree
|     |  |     |--- as xml for later download (for new tree's versions)
|     |  |     `--- in database (native tables fields)
|     |  `--- remove existing test tree from library
|     |--+ tests procedures library
|     |  |--- generate whole new procedure in library from existing tree (if not already exists)
|     |  |--- upgrade existing procedure in library from new tree version (if not already done)
|     |  `--+ remove existing procedure from library
|     |     |--- remove one existing procedure from library (if possible)
|     |     `--- remove all existing procedures associated to a tree model from library (if possible)
|     `--+ machine tests
|        |--- create an instance of an existing procedure for a given machine
|        |--+ upgrade an existing instance of a procedure from a new procedure version
|        |  |--- for a given machine
|        |  `--- for a given set of machines
|        |--- play a procedure instance for a given machine
|        `--+ delete a procedure instance
|           |--- for a given machine
|           `--- for a given set of machines
`--+ front end (gives a graphical interface able to interact with project functionnalities)
   |--- setup socket.io-client routes (events)
   |--+ tests trees
   |  |--- read existing trees (at least name + version)
   |  |--+ upload new tree
   |  |  `--- validate or not a new tree
   |  |--- download existing tree (for a new version rework)
   |  `--+ delete
   |     |--- existing tree
   |     `--- all versions of a tree
   |--+ tests procedures library
   |  |--- generate new procedure from whole new tree
   |  `--+ upgrade existing procedure from new tree version
   |     |--- for a given machine
   |     `--- for a given set of machines
   `--+ machines tests
      |--+ access existing machine tests procedures instances
      |  |--- read completed tests procedures
      |  |--- read on going tests procedures
      |  `--- continue on going tests procedures
      |--- create new test from existing procedure
      `--+ delete existing procedure instance
         |--- for a given machine
         `--- for a given set of machines
```

## Database
```
+ base de données
|--+ sql vs nosql
|  `--+ *sql* vs mongodb
|     `--+ on a besoin de pouvoir manipuler et se deplacer dans des arbres hierarchiques
|        |--- des outils avancés existent pour manipuler des arbres en sql et nosql
|        `--- ces outils sont plus facilement utilisables, mieux abstraits en sql
|--+ on va utiliser
|  |--+ un ORM, object relational mapper, sequelize
|  |  `--+ compatible mySQL (mariadb), postgreSQL, sqlite...
|  |     `--- pour le dev on choisira surement un mySQL (mariadb)
|  `--- sequelize-hierarchy pour creer des arbres hierarchiques
|--- les modèles seront décrits en javascript, en json, via sequelize
|--- les modèles seront générés par sequelize
|--+ on va avoir besoin d'interagir avec les arbres
|  |--- on va devoir créer des arbres
|  |--- on va devoir modifier des arbres
|  `--- on va devoir naviguer dans les arbres
|--+ implementation
|  |--+ création
|  |  `--- les modules sequelize/sequelize-hierarchy devraient suffir à créer les arbres et branches
|  |--+ lecture
|  |  |--- les modules sequelize/sequelize-hierarchy devraient suffir à lire les arbres et branches
|  |  `--- il faudra surement implementer une surcouche de recherche d'arbre, branches, noeuds, etc
|  |--+ modification
|  |  |--- les modules sequelize/sequelize-hierarchy devraient suffir à modifier arbres et branches
|  |  `--- il faudra surement s'appuyer sur la surcouche de recherche pour faciliter l'ecriture
|  `--+ navigation/execution
|     |--- on s'appuyera sur l'implementation de lecture et recherche de l'arbre
|     `--- on stockera un pointeur sur instruction, pointant vers un noeud, quelque part
`--+ on écrira (et générera) les modèles quand on écrira l'abstraction permettant de
   `--- creer/lire/modifier/naviguer/executer un arbre
```

## API - Application Programming Interface

On va définir les routes nécessaires au bon fonctionnement des fonctionnalités offertes par l'API

```
+ exemple de route
|--- protocole utilisé (ex: http, socket.io)
|--- nom du chemin d'accès (ex: /foo/bar, 'foobar')
|--+ paramètres d'entrée
|  |--- format des paramètres (ex: form-data, json)
|  |--- parametre 1: type, nom (ex: int, baz)
|  `--- parametre 3: type, nom (ex: string, 'foobaz')
`--+ paramètres de sortie
   |--- format des paramètres (ex: form-data, json)
   |--- parametre 1: type, nom (ex: int, baz)
   `--- parametre 3: type, nom (ex: string, 'foobaz')
```

Voir `API.md` et `API_example.md`

## Local operations to project's functionnalities
```
(###) -> element à traduire en requete/event http/socket.io

+ opérations à effectuer pour permettre la mise à disposition des fonctionnalités
|--+ librairie d'arbres de tests
|  |--+ operations coté client
|  |  |--+ ajouter un arbre dans la librairie
|  |  |  |--+ initier un upload de fichier
|  |  |  |  `--- selectionner le fichier désiré depuis le systeme de fichiers
|  |  |  |--- uploader le fichier (###)
|  |  |  `--+ récuperer si l'arbre uploadé est valide ou pas (###)
|  |  |     |--- afficher le nouvel arbre (en mode vue)
|  |  |     `--- afficher une erreur
|  |  |--+ voir les arbres de la librairie
|  |  |  |--- récupérer la liste des arbres disponibles (###)
|  |  |  |--- afficher la liste des arbres disponibles
|  |  |  |--- selectionner un arbre de la liste
|  |  |  |--- recuperer le xml de l'arbre (###)
|  |  |  `--+ afficher l'arbre selectionné
|  |  |     |--- en mode vue (arbre dé/pliable)
|  |  |     `--- en mode edition (editeur de xml)
|  |  `--+ supprimer des arbres de la librairie
|  |     |--+ selectionner
|  |     |  |--- un arbre depuis la liste des arbres disponibles
|  |     |  `--- plusieurs arbres depuis la liste des arbres disponibles
|  |     `--- envoyer la liste d'arbres a supprimer (###)
|  `--+ operations coté serveur
|     |--+ ajouter un arbre dans la librairie
|     |  |--- download le fichier envoyé par un client (###)
|     |  |--+ verifier la validité du fichier/de l'arbre envoyé par le client
|     |  |  `--+ si valide
|     |  |     `--+ remplir les id manquants dans l'arbre
|     |  |        `--+ si valide
|     |  |           `--- sauvegarder l'arbre en base de données
|     |  `--- informer le client de la validité de l'arbre envoyé (###)
|     |--+ voir les arbres de la librairie
|     |  |--- envoyer la liste des arbres disponibles (###)
|     |  `--- envoyer le xml d'un arbre passé en paramètre (###)
|     `--+ supprimer des arbres de la librairie
|        |--- recevoir une liste d'arbres à supprimer (###)
|        `--+ verifier que les arbres désirés peuvent être supprimés
|           |--+ supprimer les arbres pouvant être supprimés
|           |  `--- informer des arbres ayant été supprimés (###)
|           `--- informer des arbres ne pouvant pas être supprimés (###)
|--- librairie de procedures de tests
|--- librairie de tests machines
`--+ dashboard
   `--- pour l'instant on s'en fout
```

## Sortir la tête du code

```
+ Il faudrait
|--+ documenter l'API
|  |--+ grossièrement en ce qui concerne
|  |  |--- le dashboard
|  |  |--- la librairie d'arbres de tests
|  |  |--- la librairie de procedures de tests
|  |  `--- la librairie de tests machines
|  `--- precisement la librairie d'arbres de tests
|--+ lister les différentes pages web et les fonctionnalités qu'elles doivent apporter
|  `--- dessiner des mockups (même grossiers)?
`--+ voir si et quand, ou, et comment on fait une mise en production
   |--- voir build avec npm (dependances, etc) -> paquet debian
   `--+ reflechir au deploiement
      |--- en local (sur arch)
      |--- en local (sur vm debian)
      `--- sur un des serveur de substantiel
```

## Cut off the exceding

```
+ Exceding things
|--+ XML format
|  |--- this project has been implemented in Javascript, why using XML instead
|  |    of JSON, it's native! And it's a clearer and easier format
|  `--- let's use JSON
|--+ SQL database
|  |--- this project has been implemented in Javascript, and it seems to be a good
|  |    idea to use JSON as inputs/outputs, why using an SQL relationnal database
|  |    plus an ORM, while a MongoDB database is able to process our JSON data
|  |    (trees) without needing to reinvent the wheel ?
|  `--- let's use MongoDB + mongoose
|--+ tests procedures library
|  |--- a test procedure library would be a good idea if it was ALWAYS possible
|  |    to generate linear procedures from trees, but due to possibly present
|  |    conditional links inside a tree, a linear procedure is not always
|  |    possible to generate
|  `--- let's delete the tests procedures library, then say that we will
|       directly execute trees by reading its content (like executing a .exe)
`--+ web GUI implementation
   |--- hmm let's be honest, this project has been the first time for me to
   |    implement a web graphical user interface; I've done it, it works, but
   |    it is plain Javascript, if you don't wanna cry you should not go see it
   `--- I did not plan to redo it, but if you want to implement the last GUI
        parts, you may consider using a framework
```
