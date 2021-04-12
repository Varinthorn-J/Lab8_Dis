const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const app = express();
const PORT = 80;


let user = { 'name': 'Jaturon', 'age': 20 }
 
router.route('/users')
   .get((req, res) => res.json(user))
   .put((req, res) => {
       user = { name: req.body.name, age: user.age }
       res.json(user)
   })


let bears = { 
    list:[ {id: 1, name: "Winnie", weight: 50},
            {id: 2, name: "Pooh", weight: 60}
        ] 
    }
//TestSWR
let user1 = { 'fname': 'Ja', 'surname': 'Moo', 'major':'CoE', 'GPA': 2.2}
router.route('/studentSWR')
   .get((req, res) => res.json(user1))
   .put((req, res) => {
      user1 = { fname: req.body.fname, surname: user1.surname  , major: user1.major, GPA:user1.GPA  }
       res.json(user1)
   })
//-------
let students = {
    list: [
        {id: 1, fname: "Ja",surname: "Mo",major: "CoE", GPA: 2.2}
    ]
}

app.use(cors())
//app.use('/api', router)
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false}), router)


//STUDENTS!!
router.route('/students')
    .get((req, res) => res.json(students))
    .post((req, res) => {

        let id = (students.list.length)?students.list[students.list.length-1].id+1:1
        let fname = req.body.fname
        let surname = req.body.surname
        let major = req.body.major
        let GPA = req.body.GPA

        students = { list: [ ...students.list, {id, fname, surname, major, GPA}] }
        res.json(students)

    })


router.route('/students/:std_id')
    .get((req, res) => {

        let ID = students.list.findIndex( item => (item.id === +req.params.std_id))
        if(ID >= 0)
        {
           res.json(students.list[ID])
        }
        else
           res.json({status: "Fail, get not found!"})
    })
 
    .put((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))
    
        if(ID >= 0)
        {

            students.list[ID].fname = req.body.fname
            students.list[ID].surname = req.body.surname
            students.list[ID].major = req.body.major
            students.list[ID].GPA = req.body.GPA
            res.json(students)
            
        }
        else
        {
            res.json({status: "Fail, Student not found!"})
        }

           
    }) 

    // .put( (req,res) => {
    //     user = { fname: req.body.fname, 
    //              surname: user.surname, 
    //              major: user.major,
    //              GPA: user.GPA
    //            }
    //     res.json(user)
    // })
    .delete((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))

        
        if(ID >= 0)
        {
            students.list = students.list.filter( item => item.id !== +req.params.std_id )
            res.json(students)
            
        }
        else
        {
            
            res.json({status: "Fail, Student not found!"})
        }
            

    })



//BEARS!!!
router.route('/bears')
    .get((req, res) => res.json(bears))
    .post((req, res) => {

        let id = (bears.list.length)?bears.list[bears.list.length-1].id+1:1
        let name = req.body.name;
        let weight = req.body.weight;
        bears = { list: [ ...bears.list, {id, name, weight}] }
        res.json(bears)
    })

router.route('/bears/:bear_id')

    .get( (req, res) => {
        let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id) )
        res.json(bears.list[id])
    } )
    .put( (req, res ) => {
        let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id) )
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears)
    })
    .delete( (req, res) => {
        bears.list =bears.list.filter( (item) => item.id !== +req.params.bear_id )
        res.json(bears)
    })




app.listen(PORT, ()=> console.log('Server is running at ', PORT))