import { Schema, model } from 'mongoose';

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // name should be unique
  },
  age: {
    type: Number
  },
  workTime: [{
        fromTime: {
            type: String,
            required: true
        },
        whatDone:  {
            type: String,
            required: true
        }
    }]
});

const Person = model('Person', personSchema);

export default Person;
