var express = require("express");
var router = express.Router();

// Importamos el array de posts que tenemos precargados
// Creamos un array con diferentes post inicializados/precargados
const posts = require("../public/javascripts/posts");

// método para listar la información de los posts que tengamos precargados en el array
router.get("/all", function (req, res) {
  res.send(posts);
});

//método para añadir/crear posts
router.post("/add", (req, res) => {
  // Lo que reciba en el body lo va a añadir a nuestro array de posts
  posts.push(req.body);
  res.send(posts);
});

//método para editar información de manera parcial
router.patch("/:id", (req, res) => {
  // recogemos el id introducido desde la url
  const { id } = req.params;
  // recogemos el contenido dentro del body
  const postInfo = req.body;
  // Buscamos si el id se encuentra del array posts
  const index = posts.findIndex((post) => post.id == +id);
  // Encontrado el elemento del array,modificamos y machacamos la información que tenía
  // por la nueva que hayamos cogido en el body
  posts[index] = { ...posts[index], ...postInfo };
  // enviamos el array con el post modificado
  res.send(posts[index]);
});

//método para eliminar un post
router.delete("/:id", (req, res) => {
  const { id } = +req.params;
  const index = posts.findIndex((post) => post.id == id);
  posts.splice(index, 1);
  res.send(posts);
});

module.exports = router;
