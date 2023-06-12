const fs = require('fs');
const path = require('path');

const usuarios = {

    route: '../data/usars.json',


    findAll: function(){
        const allUsers= fs.readFileSync(path.join(__dirname, this.route), 'utf-8');
        const users = JSON.parse(allUsers);
        return users;
    },

    findById: function(id){
        const users = this.findAll();
        
        let searched = users.find(userActual => userActual.id === id);

        if(!searched){
            searched = null;
        }
        return searched;
    },

    createOne: function(newUser){
        let users = this.findAll();
        newUser.id = users[users.length-1].id+1;
        users.push(newUser);
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
    },

    deleteById: function(id){
        let users = this.findAll();
        users = users.filter(userActual => userActual.id !== id);
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, this,route), usersJSON);
        return users;
    },

    updateById: function(id,newUser){
        let users = this.findAll();
        const indice = users.findIndex(user => user.id === id);
        
        const {nombreRegForm,
            apellidoRegForm,
            emailRegForm,
            tipoUsuario,
            passRegForm,
            checkPassRegForm,
            notificaciones,
            tyc} = newUser;

        users[indice] = { 
        id: users[indice].id,
            nombreRegForm,
            apellidoRegForm,
            emailRegForm,
            tipoUsuario,
            passRegForm,
            checkPassRegForm,
            notificaciones,
            tyc,
        }
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, this,route), usersJSON);
        return users;
        }
}


module.exports = usuarios;