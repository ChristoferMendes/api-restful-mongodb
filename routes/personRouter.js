import Person from '../models/Person.js';
import { Router } from 'express';


const router = Router();

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved
  }

  if(!name){
    res.status(422).json({error: 'name is mandatory!'})
    return;
  }

  // create

  try {
    await Person.create(person)
    res.status(201).json({message: `Welcome ${name}, you salary of ${salary} is ${approved ? 'approved' : 'not approved'}`});
  }catch (err){
    res.status(500).json({error: err});
  }
})

// Read
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);

  } catch (err){
    res.status(500).json({error: err});
  }

  
})

// Read one
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({_id: id});

    if (!person) {
      res.status(422).json({message: 'User not found'})
      return;
    }

    res.status(200).json(person);
  } catch (error){
    res.status(500).json({error: error})
  }

})

// Update (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  }


  try {
    const updatedPerson = await Person.updateOne({_id: id}, person);

    if(updatedPerson.matchedCount === 0){ //if matchedCount is 1, update is succesful
      res.status(422).json({ message: 'user not found' });
      return;
    }



  } catch (error) {
    res.status(500).json({error: error})
  }

})

// Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({_id: id});


  if (!person) {
    res.status(422).json({ message: 'User not found'})
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: 'User deleted with success '})

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default router;