import express from 'express';
import mongoose from 'mongoose';
import Person from '../models/person.js';



const router = express.Router();
router.get('/users', (req, res) => {
  /*Person.deleteMany({})
    .then(() => {
        console.log('All documents removed successfully');
    })
    .catch(err => {
        console.log('Error removing documents:', err);
    });*/

    /*let x =async () => {
      try {
        await Person.collection.dropIndex('email_1');
        console.log('Index dropped successfully');
      } catch (err) {
        console.error('Error dropping index:', err);
      }
    
    }
    x();*/

  /*Person.init().then(() => {
    console.log('Indexes are ready');
  });*/

  let personName = req.query.name;

  async function findPersonByName(name) {
  try {
    const person = await Person.findOne({ name: name });
    if (person) {
      console.log("Person found:", person);
      res.json(person);
    } else {
      console.log("No person found with that name; start create one new");
      const newPerson = new Person({
        name: name,
        age: 1,
        workTime: []
      });
      updatePerson(name, newPerson);
      res.json(newPerson);
    }
  } catch (err) {
    console.error("Error fetching person by name:", err);
  }
}

findPersonByName(personName);
  
  /*const newPerson = new Person({
    name: 'Alex', age: 25,
    workTime: [{
      fromTime: "2024-05-04T12:30:45",
      whatDone: "something done..."
    }]
  });
  newPerson.save().catch(err => {
    console.error('Error saving new person:', err.message);
  });*/

  

  
  });


  async function updatePerson(nameToUpdate, newData) {
    try {
      const doc = await Person.findOneAndUpdate({ name: nameToUpdate }, newData, { new: true, upsert: true });
      console.log("Person updated or created:", doc);
    } catch (err) {
      console.error("Error updating person:", err);
    }
  }
  
  

  router.post('/users/update', (req, res) => {
    const p = req.body.data;
    console.log("/users/update:", p);
    updatePerson(p.name, p);
    res.json({status: "ok"});
  });


export default router;
