const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }

},{timestamps:true});

userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password, salt);
    next();
});

// create a static method to login user
userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email: email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('Incorrect password');
        }
        throw Error('Incorrect email');
    } catch (error) {
        throw error;
    }
};


const user=mongoose.model('user',userSchema);
module.exports=user;