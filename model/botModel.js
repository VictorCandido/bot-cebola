module.exports = (sequelize, Sequelize) => {
    const Bot = sequelize.define('bot', {
        frasesDoDia: {
            type: Sequelize.STRING
        }
    });

    return Bot;
}