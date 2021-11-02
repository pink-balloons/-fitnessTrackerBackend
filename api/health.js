const express = require("express")
const healthRouter = express.Router();

healthRouter.get("/", async (req, res) =>{
    try {
        const allClear = "Server is healthy"
    
        res.send(allClear)
    } catch (error) {
        throw error
    }  
})