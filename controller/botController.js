

// Cria um novo usuario
// exports.create = (req, res) => {
//     const nomeUsuario = req.body.nomeUsuario;
//     const password = req.body.password;

//     if (nomeUsuario || password) {

//         Usuario.create({ nomeUsuario, password }).then(newUser => {
//             res.status(201).send(newUser);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message
//             })
//         });

//     } else {

//         res.status(400).send({
//             message: 'Falha ao criar novo usuário!'
//         });

//         return;
//     }
// };

// // Retornar todos os registros de usuarios
// exports.findAll = (req, res) => {
//     Usuario.findAll().then(usuarios => {
//         res.status(200).send(usuarios);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         })
//     });
// };

// // Retorna apenas um registro de usuario
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Usuario.findByPk(id).then(usuario => {
//         if (usuario) {
//             res.status(200).send(usuario);
//         } else {
//             res.status(404).send({
//                 message: 'Usuário não encontrado'
//             })
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         })
//     });
// };

// // Atualiza um usuario
// exports.update = (req, res) => {
//     const body = req.body;
//     const id = req.params.id;

//     Usuario.update({
//         nomeUsuario: body.nomeUsuario,
//         password: body.password
//     }, {
//         where: { id: id }
//     }).then(num => {
//         if (num > 0) {
//             res.status(200).send({
//                 message: 'Usuário atualizado com sucesso.'
//             });
//         } else {
//             res.status(404).send({
//                 message: 'Usuário não encontrado.'
//             })
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         })
//     });
// };

// // Deleta um usuario
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Usuario.destroy({ where: { id } }).then(num => {
//         if (num > 0) {
//             res.status(200).send({
//                 message: 'Usuário removido com sucesso.'
//             });
//         } else {
//             res.status(404).send({
//                 message: 'Usuário não encontrado.'
//             })
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         })
//     });
// };