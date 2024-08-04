const express = require('express');
const workoutRouter = express.Router();
const Workout = require('../models/workout');

// GET all workouts
workoutRouter.get('/', async (req, res, next) => {
    try {
        const foundWorkouts = await Workout.find({ userId: req.auth._id });
        return res.status(200).send(foundWorkouts);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// POST a new workout
workoutRouter.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        req.body.userId = req.auth._id;
        console.log(req.body)
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        return res.status(201).send(savedWorkout);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// DELETE a workout by ID
workoutRouter.delete('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = req.params.workoutId;
        const deletedWorkout = await Workout.findOneAndDelete({ _id: workoutId });
        if (!deletedWorkout) {
            return res.status(404).send(`Workout with ID ${workoutId} not found`);
        }
        return res.status(200).send(`You have successfully deleted ${deletedWorkout.name}`);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// PUT (update) a workout by ID
workoutRouter.put('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = req.params.workoutId;
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).send(`Workout with ID ${workoutId} not found`);
        }
        return res.status(200).send(updatedWorkout);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// GET a workout by ID
workoutRouter.get('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = req.params.workoutId;
        const foundWorkout = await Workout.findById(workoutId);
        if (!foundWorkout) {
            return res.status(404).send(`Workout with ID ${workoutId} not found`);
        }
        return res.status(200).send(foundWorkout);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

module.exports = workoutRouter;
