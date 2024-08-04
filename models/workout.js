const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        name: {
            type: String,
            required: true,
        },
        sets: [{
            setCount:{
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
        }],
        restTime: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        }],
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                 required: true
            }
});

module.exports= mongoose.model('Workout', workoutSchema);

 
