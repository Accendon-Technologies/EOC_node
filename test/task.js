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


describe("Tasks API - AdminUser", ()=>{

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
                it('it should  not return  all adminusers',(done)=>{
                    chai.request(server)
                        .get('/api/adminuserlist')
                        .end((error,res)=>{
                            res.should.have.status(202);
                            res.body.should.have.property('status');
                            res.body.should.have.property('message');
                            res.body.should.have.property('data');

                            done();
                        })
        
        

        })
    })
    

    //getby id adminuser

    describe("GET /api/adminusers/id",()=>{
        
        it('it should get  list of adminusers by id',(done)=>{
            const id = 1;
            chai.request(server)
                .get('/api/getone-adminuser/'+id)
                .end((error,res)=>{
                    res.should.have.status(200);
                  
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');

                    done();
                })
            })
            it('it should  not return  the adminusers',(done)=>{
                const id = 2;
                chai.request(server)
                    .get('/api/getone-adminuser/'+id)
                    .end((error,res)=>{
                        res.should.have.status(202);
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');

                        done();
                    })
    
    

             })
    })


    // post the adminusers

    describe("Post the adminuser",()=>{
      

      it('post adminuser',(done)=>{
         chai. request(server).post('/api/add-adminuser')
          .send({FirstName:'kevin',LastName:'mathew',Email:'kevin12347@gmail.com',PhoneNumber:'8788563895',UserType:'teacher',Password:'hjh',Username:'buyt',Subject:'english',AboutInstructor:'gtyijj',profilephoto:'bhbscbh'})
          .then((res)=>{

                 res.body.should.have.property('status');
                 res.body.should.have.property('message').eql('added data of adminusers');
           
         
              done();

          })
          .catch((err)=> done(err));
      })
    })



    //delete the adminusers


    describe("delete /api/delete-adminuser/:id",()=>{
      
       
        it('Should delete list of adminuser by using id',(done)=>{
            const id = 112
           chai. request(server)
           .delete('/api/delete-adminuser/'+id) 
            .end((err,res)=>{
                    res.should.have.status(200)
                   res.body.should.have.property('status');
                   res.body.should.have.property('message');
             
           
                done();
  
            })
            
      
        })

       it('Should not  delete list of adminuser by using id',(done)=>{
            const id = 116
           chai. request(server)
           .delete('/api/delete-adminuser/'+id) 
            .end((err,res)=>{
                    res.should.have.status(202)
                   res.body.should.have.property('status');
                   res.body.should.have.property('message');
             
           
                done();
  
            })
            
      
        })
        

      })


//update the adminusers

      describe("put /api/edit-adminuser/:id",()=>{
      
       
        it('Should update list of adminuser by using id',(done)=>{
            const id =4;
           chai. request(server)
           .put('/api/edit-adminuser/'+id) 
           .send({FirstName:'kevin',LastName:'mathew',Email:'kevin14@gmail.com',PhoneNumber:'8788563678',UserType:'teacher',Password:'hjh',Username:'buyt',Subject:'english',AboutInstructor:'gtyijj',profilephoto:'bhbscbh'})
            .end((err,res)=>{
                
                   res.body.should.have.property('status');
                   res.body.should.have.property('message').eql("updated the adminuser ");
             
           
                done();
  
            })
          
      
        })

       
      })

//update the status


describe("put /api/update-status/:id",()=>{
      
       
    it('Should update status of adminuser by using id',(done)=>{
        const id =5;
       chai. request(server)
       .put('/api/update-status/'+id) 
       
        .end((err,res)=>{
                res.should.have.status(200);
               res.body.should.have.property('status');
               res.body.should.have.property('message');
         
       
            done();

            })
      
  
        })

        it('Should not update status of adminuser by using id',(done)=>{
            const id =3;
           chai. request(server)
           .put('/api/update-status/'+id) 
           
            .end((err,res)=>{
                    res.should.have.status(400);
                   res.body.should.have.property('status');
                   res.body.should.have.property('message');
             
           
                done();
    
                })
          
      
            })
    })

      
})



           
    

    

/** package Test */

describe('TASK API - PAckage',()=>{

    /**get package test */


    describe('GET /api/get_package',()=>{
        it('should return details of all packages',(done)=>{
            chai.request(server)
                .get('/api/get_package')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('List');
                    done();
                })
        })

        it('should not return details of all packages',(done)=>{
            chai.request(server)
                .get('/api/get_package')
                .end((err,res)=>{
                    res.should.have.status(202);
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('List');
                    done();
                })
        })
    })



    /** create pacakge test */

    describe("POST /api/create_pacakge",()=>{
      

        it('should create  a package',(done)=>{
           chai. request(server)
            .post('/api/create_package')
            .send({Exam:'PSC',Package_Title:'PSC and SSC',Short_Title:'PSC',Description:'combined video class of psc and ssc',Language:'Malayalam',Color_Code:'FFF#',Image:'dr.png',Package_Fee:'25000',Old_Package_Fee:'30000',Package_Duration_in_month:'lifetime',Package_Features:'mocktest'})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                done();
            })
        })
        it('should not create  a package',(done)=>{
            chai. request(server)
             .post('/api/create_package')
             .send({Exam:'PSC',Package_Title:'PSC and SSC',Short_Title:'PSC',Description:'combined video class of psc and ssc',Language:'Malayalam',Color_Code:'FFF#',Image:'dr.png',Package_Fee:'25000',Old_Package_Fee:'30000',Package_Duration_in_month:'lifetime',Package_Features:'mocktest'})
             .end((err,res)=>{
                 res.should.have.status(400);
                 res.body.should.have.property('status');
                 res.body.should.have.property('message');
                 done();
             })
         })
      })


      /** getone package */

      describe('GET /api/getone_package',()=>{
          it('Should get package by its id',(done)=>{
              const id =2;
              chai.request(server)
                .get('/api/getone_package/'+id)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('List');
                    done();

                })

          })
          it('Should not get package by its id',(done)=>{
            const id =5;
            chai.request(server)
              .get('/api/getone_package/'+id)
              .end((err,res)=>{
                  res.should.have.status();
                  res.body.should.have.property('status');
                  res.body.should.have.property('message');
                  res.body.should.have.property('List');
                  done();
                  
              })

        })
      })


})