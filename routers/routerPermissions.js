const express = require("express");
const routerPermissions = express.Router();

let authorizers = require("../data/authorazers")
let permissions = require("../data/permissions")
let users = require("../data/user")

routerPermissions.get("/", (req, res) => {
    res.json(permissions)
})

routerPermissions.put("/:id/approvedBy", (req, res) => {
    let permissionsId = req.params.id
    let authorizersEmail = req.body.authorizersEmail
    let authorizersPassword = req.body.authorizersPassword

    // autent
   let authorizers = authorizers.find(
     a => a.email == authorizersEmail && a.password == authorizersPassword)
     if ( authorizers == undefined){
        return res.status(401).json({ error: "no autorizado"})
     }

// validac
let permissions = permissions.find( p => p.id == permissionsId)
if ( permissions == undefined ){
    return res.status(400).json({ error: "no permissionsId"})
}
permissions.approdedBy.push(authorizers.id)

res.json(permissions)

})


routerPermissions.post("/", (req, res) => {
    let text = req.body.text
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword


    // validacion 
    let listUsers = users.filter(
        u => u.email == userEmail && u.password == userPassword )

    if ( listUsers.length == 0 ){
        return res.status(401).json({ error: "no autorizado"})
    }

    let errors = []
    if (text == undefined){
        errors.push("no text in the body")
    }
    if ( userId == undefined){
        errors.push("no userId in the body")
    }
    if ( errors.length > 0 ){
        return res.status(400).json({ errors: errors})
    }

    let lastId = permissions[permissions.length-1].id

    permissions.push({ 
        id: lastId+1,
         text: "hacer una compra", 
         approdedBy:[],
          userId: listUsers[0].id
        })

        res.json({ id: lastId+1 })
        // 1 { clave: valor }

})



module.exports = routerPermissions