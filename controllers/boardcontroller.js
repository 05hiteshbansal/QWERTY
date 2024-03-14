const Board=require("../models/boardModel")
const User=require("../models/userModel")

exports.create=async(req,res)=>{
const {secret}=req.body;
const id=req.user.id
// secret is a random string from frontend;
// assuming user exist
const array=[];
array.push(id);
const board=await Board.create({secret:secret,students:array})
res.status(200).json({boardId: board , createdby: id })
}

exports.join=async(req,res)=>{
    const boardId=req.params['id']
    const {secret}=req.body;
    const id = req.user.id

    // secret is a random string from frontend;
    // assuming user exist
const joinboard=await Board.findById(boardId)
console.log(joinboard)
if(secret!=joinboard.secret){
    res.status(400).json({"success": false, "message" : "invalid credentials" })
}
else{
    const array=joinboard.students;
    array.push(id);
    joinboard.count=+1;
    const board=await Board.findByIdAndUpdate(boardId,joinboard)
    res.status(200).json({boardId: board , joinedBy: req.user.name })
    }}

exports.draw=async(req,res){
    
}