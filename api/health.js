const express = require("express")
const healthRouter = express.Router();

healthRouter.get("/", async (req, res) =>{
    const allClear = "Server is healthy"
    
    res.send(allClear)
})