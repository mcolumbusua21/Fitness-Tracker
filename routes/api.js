const router = require('express').Router();
const { Workout } = require('../models')

router.get('/workouts', async function(req, res){
    try {
        const data = await Workout.aggregate([
          {
            $addFields: {
              totalDuration: {
                $sum: "$exercises.duration",
              },
            },
          },
        ]);
        res.json(data);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }

});
router.put('/workouts/:id', async function(req, res){
    try{
        const data = await Workout.updateOne(
           { _id: req.params.id },
           {
               $push: {
                   exercises: req.body,
               }
           }
        );
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }) ;  

router.post('/workouts', async function(req, res){
    try{
        const data = await Workout.create(req.body);
        res.json(data);
        //const newWorkout =  await Workout.create(req.body);
         //res.json(newWorkout);
    }catch (err) {
        console.log(err)
        res.end()
    }
});
router.get('/workouts/range', async function(req, res){
    try {
        const data = await Workout.aggregate([
          {
            $addFields: {
              totalDuration: {
                $sum: "$exercises.duration",
              },
            },
          },
        ])
        .sort({'_id': -1})
        .limit(7)
        console.log(data)
        res.json(data);
      }catch (err) {
          console.log(err);
          res.status(500).send(err);
 }
});


module.exports = router;