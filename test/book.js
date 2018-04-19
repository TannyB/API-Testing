/**
 * Created by meself on 14/01/2017.
 */

let mongoose = require("mongoose");
let Book = require('../app/models/book');

let chai = require('chai');
let chaiHttp =  require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
    beforeEach((done) => {
        Book.remove({}, (err) => {
            done();
        });
    });

   describe('/GET book', () => {
       it('it should GET all the books', (done) => {
           chai.request(server)
               .get('/book ')
               .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
               done();
               });
       });

   })

    describe('/POST book', () => {
        it('it should POST a book', (done) => {
            let book = {
                title: "Lord of the Rings",
                author: "JRR Toelkin",
                year: 1966,
                pages: 1170
            }

            chai.request(server)
                .post('/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully added!');
                    res.body.book.should.have.property('title');
            done();
            })
        })
    })

})








9
