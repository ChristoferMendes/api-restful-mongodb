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

export default router;