const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema


const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true
    },

    password :{
        type: String,
        required: true
    },

    isAdmin : {
        type: Boolean,
        default: false,
    },

    memberSince : { 
        type: Date,
        default: Date.now,
    }
})

userSchema.pre('save', async function (next){
    const user = this 
    if(user.isModified('password')){
        try{
           const hash = await bcrypt.hash(user.password, 10) 
           user.password = hash

        } catch(error){
            console.log(error)
            return next (error)
        }
    }
})

userSchema.methods.checkPassword = async function (passwordAttempt){
    try{
        return bcrypt.compare(passwordAttempt, this.password)
    }catch(error){
        throw(error)

    }
}

userSchema.methods.withoutPassword = function (){
    const user = this.toObject()
    delete user.password
    return user
}



module.exports = mongoose.model ('User',userSchema) ;