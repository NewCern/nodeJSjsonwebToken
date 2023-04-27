const { artists, users, stores } = require("../database")
const jsonWebToken = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports.getPeople = async (req, res) => {
    try{
        const allArtists = await artists;
        allArtists.length !== 0
        ? res.json({success: true, message:'you have people', allArtists})
        : res.json( { success: false, message:'no people here' } )
    } catch(error){
        res.status(500).json({success: false, message: 'error'})
    }
}

module.exports.getStores = async (req, res) => {
    try{
        const allStores = await stores;
        allStores.length !== 0
        ? res.json({success: true, message:'you have stores', allStores})
        : res.json( { success: false, message:'no stores available' } )
    } catch(error){
        res.status(500).json({success: false, message: 'error'})
    }
}

module.exports.login = async (req, res) => {
    const user = await users.find(user => user.name === req.body.name && user.password === req.body.password)
    if(!user) 
    return res.status(403).json({success: false, message: 'incorrect credentials', status: 403} );
    const accessToken = jsonWebToken.sign({
        id: user.id,
        name: user.name,
        roleId: user.roleId,
    },
    process.env.JWT_KEY,
    {
        expiresIn: "1d",
    });
    return res.status(200).json({success: true, message: 'granted', user, accessToken})
} 

