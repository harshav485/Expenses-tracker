const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Created_at: {
        type: Date,
        default: Date.now
    }
})

var expenseSchema = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    typeOf: {
        type: String
    },
    amount: {
        type: String,
    }
})

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = User = mongoose.model('users', UserSchema)