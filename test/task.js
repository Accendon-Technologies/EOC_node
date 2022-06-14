const { request } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
var connection = require('../app/config/db.config').connection;
let server = require('../index');




//Assertion Style
 chai.should();
 const expect = chai.expect;

//middleware
chai.use(chaiHttp);


describe("Tasks API", ()=>{

    // Test the get group

    describe("GET all adminusers",()=>{
        //it describe the test case
        it('it should get  list of all adminusers',(done)=>{
            chai.request(server)
                .get('/api/adminuserlist')
                .end((error,res)=>{
                    res.should.have.status(200);
                  
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');

                    done();
                })

        })
    })

    describe("Post the adminuser",()=>{
      

      it('post adminuser',(done)=>{
         chai. request(server).post('/api/add-adminuser')
          .send({FirstName:'kevin',LastName:'mathew',Email:'kevin1234@gmail.com',PhoneNumber:'878563895',UserType:'teacher',Password:'hjh',Username:'buyt',Subject:'english',AboutInstructor:'gtyijj',profilephoto:'bhbscbh'})
          .then((res)=>{
              
                 res.body.should.have.property('status');
                 res.body.should.have.property('message').eql('added data of adminusers');
           
         
              done();

          })
          .catch((err)=> done(err));
      })
    })

})