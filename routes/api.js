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
        const data = await Workout.updateOne(req.body, {
            where: {
                id: req.params.id,
            },
        })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    

});
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
//     try {
//         const data = await Workout.aggregate([
//           {
//             $addFields: {
//               totalDuration: {
//                 $sum: "$exercises.duration",
//               },
//             },
//           },
//         ])
//         .sort({'_id': -1})
//         .limit(7)
//         console.log(data)
//         res.json(data);
//       }catch (err) {
//           console.log(err);
//           res.status(500).send(err);
// }
Workout.find({}).then(dbWorkout => {
    console.log("ALL WORKOUTS");
    console.log(dbWorkout);

    res.json(dbWorkout);
}).catch(err => {
    res.json(err);
});
});

module.exports = router;