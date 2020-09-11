var dbPath = './db.json'
var fs = require('fs')

exports.find = function(callback){
   fs.readFile(dbPath, function (err, data){
       if(err){
           return callback(err)
       }
       callback(null, JSON.parse(data).users) 
   })
}

exports.findById = function(id,callback){
    fs.readFile(dbPath, function (err, data){
        if(err){
            return callback(err)
        }
        var users = JSON.parse(data).users
        var ret = users.find(function(item){
            return item.id === parseInt(id)
        })
        callback(null, ret) 
    })
 }

exports.save = function(user,callback){
    fs.readFile(dbPath, 'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var users = JSON.parse(data).users

        user.id = users[users.length - 1].id + 1

        users.push(user)

        var fileData = JSON.stringify({
            users: users
        })

        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })

    
}

exports.updataById = function(user, callback){
    fs.readFile(dbPath, function (err, data){
        if(err){
            return callback(err)
        }
        var users = JSON.parse(data).users

        var peo = users.find(function(item){
            return item.id === user.id
        })
        for(var key in user){
            peo[key] = user[key]
        }
    
        var fileData = JSON.stringify({
            users : users
        })
    
        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })           
    })

    
}

exports.deleteById = function(id, callback){
    fs.readFile(dbPath, 'utf-8',function(err,data){
        if(err){
            return callback(err)
        }
        var users = JSON.parse(data).users

        var deleteId = users.findIndex(function(item){
            return item.id === parseInt(id)
        })
        users.splice(deleteId,1)

        var fileData = JSON.stringify({
            users : users
        })
    
        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        }) 

    })
}

