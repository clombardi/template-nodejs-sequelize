const Usuario = require('../models/usuario');

const index = async (req, res) => {
  const data = await Usuario.findAll({});
  res.send({ data });
};

const show = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  res.send(usuario);
};

const changeAvatarUrl = async (req, res) => {
  const newAvatarUrl = req.body.avatarUrl;
  const usuario = await Usuario.findByPk(req.params.id);
  usuario.avatarUrl = newAvatarUrl;
  usuario.save();
  res.send(usuario);
};

module.exports = { index, show, changeAvatarUrl };
