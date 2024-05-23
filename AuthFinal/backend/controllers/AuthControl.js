const User = require("../models/User");
app.get("/an",(req,res)=>{
    res.send("Hello,world! isssa");
});
app.get("/",(req,res)=>{
    res.send("Hello,world! empty");
});
app.post("/register",async (req,res)=>{
    try {
        const {firstName,lastName,userhandle,email,password}=req.body;
        if(!(firstName&&lastName&&userhandle&&email&&password)){
            return res.status(400).send("Please enter all the information");
        }
        const existingUser=await User.findOne({ userhandle });
        if(existingUser){
            return res.status(400).send("User already exists with the same handle");
        }
        const existingUser2=await User.findOne({ email });
        if(existingUser2){
            return res.status(400).send("User already exists with the same email");
        }
        const hashedPassword= await bcrypt.hash(password,process.env.no_rounds_hash);
        const user=await User.create({
            firstName,
            lastName,
            userhandle,
            email,
            password: hashedPassword,
        });
        const token=jwt.sign({id:user._id,userhandle},process.env.SECRET_KEY,{
            expiresIn: '1h',
        });
        user.token=token;
        user.password=undefined;
        res.status(200).json({message: "You have succesfully registerd!",user})
    } 
    catch (error) {
        console.log(error);
    }
});