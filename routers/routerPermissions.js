const express = require("express");
const routerPermissions = express.Router();

let authorizers = require("../data/authorazers")
let permissions = require("../data/permissions")
let users = require("../data/user")
let jwt = require("jsonwebtoken")

routerPermissions.get("/", (req, res) => {

    let apiKey = req.query.apiKey
    let infoApiKey = null

    try {
         infoApiKey = jwt.verify(apiKey, "secret")

    } catch ( error){
        res.status(401).json({ error: "Invalid token"})
        return
    }
   
    let text = req.query.text
    if ( text != undefined){
        let permissionsWithText = permissions.filter(p => p.text.includes(text))
        res.json(permissionsWithText)
        return 
    }
    res.json(permissions)
})

routerPermissions.get("/:id", (req, res) => {

    let apiKey = req.query.apiKey
    let infoApiKey = null

    try {
         infoApiKey = jwt.verify(apiKey, "secret")

    } catch ( error){
        res.status(400).json({ error: "Invalid token"})
        return
    }
   
    let id = req.params.id
    if ( id == undefined){
        res.status(400).json({ error: "no id"})
        return 
    }
    let permissions = permissions.find( p => p.id == id)
    if ( permissions == undefined){
        res.status(400).json({ error: " Invalid id"})
        return 
    }

    res.json(permissions)
})
routerPermissions.post("/", (req, res) => {
    let text = req.body.text

    let apiKey = req.query.apiKey
    let infoApiKey = null

    try {
         infoApiKey = jwt.verify(apiKey, "secret")

    } catch ( error){
        res.status(401).json({ error: "Invalid token"})
        return
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
         text: text, 
         approdedBy:[],
          userId: infoApiKey.id
        })

        res.json({ id: lastId+1 })
        // 1 { clave: valor }

})

routerPermissions.put("/:id/", (req, res) => {

    let apiKey = req.query.apiKey
    let infoApiKey = null

    try {
         infoApiKey = jwt.verify(apiKey, "secret")

    } catch ( error){
        res.status(401).json({ error: "Invalid token"})
        return
    }
    
    let permissionsId = req.params.id
    if ( permissionId == undefined){
        res.status(400).json({ error: "no id"})
        return
    }
    let permissions = permissions.find(
        p > p.id == permissionId && p.userId == infoApiKey.id)

    if ( permission == undefined){
        res.status(400).json({ error: "no permission with this id"})
        return 
    }
    let text = req.body.text
    if ( text != undefined){
    permission.text = text ;
    }
    res.json({ modifiyed: true})
    })

    routerPermissions.put("/:id/aprovedBy", (req, res) => {

        let apiKey = req.query.apiKey
        let infoApiKey = null
    
        try {
             infoApiKey = jwt.verify(apiKey, "secret")
    
        } catch ( error){
            res.status(401).json({ error: "Invalid token"})
            return
        }

        let user = users.find( u  => u.id == infoApiKey)
        if (user.role == "admin"){
            res.status(401).json({ error: "user is not an admin"})
            return 
        }
       
        let permissionId = req.params.id
   
// calidac
if ( permissionId == undefined){
    return res.status(400).json({ error: "no permissionsId"})
}
let permission = permissions.find(p => p.id == permissionId)
permission.approvedBy.push(authorizers.id)

res.json(permission)
})


routerPermissions.delete("/:id", (req, res) => {

    let apiKey = req.query.apiKey
    let infoApiKey = null

    try {
         infoApiKey = jwt.verify(apiKey, "secret")

    } catch ( error){
        res.status(401).json({ error: "Invalid token"})
        return
    }
   
    let permissionsId = req.params.id
    if ( permissionsId == undefined){
        res.status(400).json({ error: "no id"})
        return 
    }
    let permission = permissions.find( p => p.id == permissionId)
    if ( permission == undefined){
        res.status(400).json({ error: "no permissions with this id"})
        return 
    }
    
    permissions = permissions.filter( p => p.id != permissionsId)

    res.json({ deleted: true})

})


module.exports = routerPermissions