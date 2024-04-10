/* eslint-disable new-cap */
/*
 * Testataan että mongodb:n perustoiminnot toimivat
 */
require('../dbconnection');
//const expect = require('chai').expect;
const expect = require('fix-esm').require('chai').expect;
const Student = require('../models/Student');
const NewTestStudentObject = require('../NewTestStudentObject');

// NewTestStudentObject on skeeman mukainen olio josta tehdään Student-tyyppinen
const NewTestStudent = Student(NewTestStudentObject);

describe('Testing mongodb', () => {
  it('should save data to test database', (done) => {
    NewTestStudent.save()
      .then((doc) => {
        //console.log(doc);
        done();
      })
      .catch(done)
      .catch((err) => {
        console.error(err);
      });
  });

  it('should retrieve correct data from test database', (done) => {
    Student.find({
      name: 'Testi Opiskelija',
    })
      .then((student) => {
        if (student.length === 0) {
          throw new Error('Student with given name value not found!');
        }
        expect(student[0]).to.have.property('_id'); // mongo on luonut dokumentille _id-kentän
        expect(student[0].grades[0]).to.have.property('coursecode'); // alidokumentin eka kenttä olemassa
        done();
      })
      .catch(done)
      .catch((error) => {
        throw error;
      });
  });
});
