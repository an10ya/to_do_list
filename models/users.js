import mongoose from 'mongoose';

//Structure of each User Model
const userSchema = mongoose.Schema({
    username:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    profile:{ type: String, required: true}
});

const User = mongoose.model('USER MODEL', userSchema);

export default User;