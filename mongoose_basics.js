/* eslint-disable new-cap */

/* MONGOOSE-ESIMERKKI
 *
 * Tiedon tallennus, haku, muokkaus ja poisto Mongoosen avulla. Toimenpiteet on tehty
 * kahdella tavalla: koodi ei funktion sisällä ja koodi funktion sisällä. Jos koodi ei ole
 * funktion sisällä, se ajetaan heti kun tiedosto ajetaan.
 *
 * Mongoose on kirjasto joka tarjoaa helppokäyttöisemmän rajapinnan MongoDB:n käsittelyyn.
 * Mongoose käyttää kannan käsittelyyn omia metodejaan jotka ovat hieman eri nimisiä kuin
 * MongoDB:n varsinaiset metodit. Mongoose tarjoaa tiedolle myös skeeman joka voidaan
 * määritellä tarkasti.
 *
 * Mongoose on ODM-työkalu (Object Document Modeling) joka on dokumenttikannalle
 * sama asia kuin ORM relaatiotietokannalle.
 *
 * Mongoosen periaatteena on että luodaan skeema eli esitysmuoto joka tallennetaan
 * malliksi (model). Mongoosen CRUD-metodit kohdistetaan modeliin. Mongodb-tietokanta ei
 * sisällä mitään skeemaa, joka pakottaisi kantaan tallennettavan datan tietyn muotoiseksi,
 * joten Mongoose lisää sovelluksen toimintavarmuutta ja turvallisuutta. Mongoosen versiosta 7
 * alkaen modelin metodit palauttavat vain promiseja.
 *
 * Mongoosen skeemat voivat olla myös hierarkisia (alidokumentit) ja niiden välillä
 * voi olla assosiaatioita. Tässä sellaisia ei ole.
 *
 * Tässä esimerkissä kannan url-osoite on piilotettuna .env-tiedostoon, mikä on
 * tietoturvan kannalta järkevää.
 *
 */

/************************SKEEMA***************************************/

//mongoose-skeema Taskschema määrittelee millainen on Task eli tehtävä
const Taskschema = new mongoose.Schema({
  project: { type: String, unique: true },
  description: { type: String },
});
// Skeemasta pitää tehdä model, jonka kautta tietokantaa käsitellään, koska
// kantaa käsitellään modelin metodeilla

//skeemasta tehdään model nimeltään Task. Model on luokka joka sisältää skeeman.
const Task = mongoose.model('Task', Taskschema);

/************************TIETOKANTAOPERAATIOT*************************/

//tallennettava tieto oliona
const newTaskObject = {
  project: 'Project2',
  description: 'Do exercise 2',
};
//Tehdään newTaskObject-oliosta Task-tyyppinen
// newTask on Task-tyyppinen olio
newTask = Task(newTaskObject);

//----------TALLENNUS-------------------------------//

async function createTask(task) {
  const result = await Task.create(task).catch((err) => {
    console.log(err);
  });
  // tuloksena saadaan luotu task
  console.log('Task created. ' + result);
}

//createTask(newTask);

//----------HAKU-------------------------------//

// Yhden taskin haku on toteutettu kahdella eri tavalla 1) promisella,
// 2) promisella käyttäen async-awaitia

/* 1) Taskin haku promisella. Haku tapahtuu Task-modelin find-metodilla 
   project-avaimen arvon perusteella. Haku on nopeampi kuin tallennus, 
   joten se tapahtuu ennen tallennusta, jos ne ajetaan samaan aikaan.
*/

/*
Task.find({
  project: 'Project1',
})
  .then((task) => {
    console.log(task);
  })
  .catch((err) => {
    throw err;
  });
*/

// 2) Sama kuin edellä funktion sisällä async-awaitilla

async function findTask(projname) {
  const task = await Task.find({
    project: projname,
  }).catch((err) => {
    throw err;
  });
  console.log(task);
}

//findTask('Project3');

// Kaikkien taskien haku async-awaitilla

async function findTasks() {
  const tasks = await Task.find().catch((err) => {
    throw err;
  });
  // tasks-taulukko
  console.log(tasks);
  // otetaan taulukosta kuvaukset
  tasks.forEach((task) => {
    console.log(task.description);
  });
}

//findTasks();

//----------MUOKKAUS-------------------------------//

// Muokkaus tapahtuu modelin updateOne-metodilla.
// Se päivittää dokumentin jossa project on 'Project1'

// Mongoose-päivitysmetodin yleinen muoto on: await Model.metodi({kohde}, {uusi data}).catch())

async function updateTask(projname, desc) {
  const result = await Task.updateOne(
    { project: projname }, // kohde, voitaisiin tehdä myös _id:n perusteella:  { _id: tähän dokumentin _id }
    { description: desc } // muokattava tieto
  ).catch((err) => {
    throw err;
  });
  console.log(result); //katsotaan millainen on result-olio
  console.log(result.matchedCount + ' document updated.');
}

//updateTask('Project1', 'Do the new excercise')

//----------POISTO-------------------------------//

/*
Task.deleteOne({
  project: 'Project1',
})
  .then(() => {
    console.log('Task deleted');
  })
  .catch((err) => {
    throw err;
  });
*/

// sama kuin edellä async-awaitilla

async function deleteTask(projname) {
  await Task.deleteOne({
    project: projname,
  }).catch((err) => {
    throw err;
  });
  console.log('Task deleted');
}

//deleteTask('Project1');
