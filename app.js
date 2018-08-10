const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/author_app');
app.use(express.static(__dirname + '/public/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var authorSchema = new mongoose.Schema({
    name : {type: String, required: true, minlength: 3},
    quotes : [{
        content: {type: String, minlength: 3},
        vote: {type: Number, default: 0}
    }]
}, {timestamps: true});

var Author = mongoose.model('Author', authorSchema);

app.get('/api/authors', (req, res) => {
    Author.find({}, (err, data) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({data : data});
        }
    });
});

app.get('/api/author/:id', (req, res) => {
    Author.findById(req.params.id, (err, data) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({data: data});
        }
    });
});

app.post('/api/new', (req, res) => {
    Author.create(req.body, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'})
        }
    });
});

app.post('/api/newQuote/:id', (req, res) => {
    Author.findOne({_id : req.params.id}, (err, author) => {
        if(err) {
            res.json(err);
        } else {
            author.quotes.push(req.body);
            author.save(err => {
                if(err) {
                    res.json(err);
                } else {
                    res.json(author);
                }
            });
        }
    });
});

app.put('/api/edit/:id', (req, res) => {
    Author.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'})
        }
    });
});

app.delete('/api/delete/:id', (req, res) => {
    Author.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json({message: 'success'})
        }
    });
});

app.delete('/api/delete/author/:author_id/quote/:quote_id', (req, res) => {
    Author.findOne({_id : req.params.author_id}, (err, author) => {
        if(err) {
            res.json(err);
        } else {
            let quote = author.quotes.id(req.params.quote_id);
            quote.remove();
            author.save(err => {
                if(err) {
                    res.json(err);
                } else {
                    res.json(author);
                }
            });
        }
    });
});

app.post('/api/author/:author_id/quote/:quote_id', (req, res) => {
    console.log(req.params.author_id, req.params.quote_id)
    Author.findOne({_id: req.params.author_id}, (err, author) => {
        if(err) {
            res.json(err);
        } else {
            var myQuote = author.quotes.id(req.params.quote_id);
            if(req.body.vote == "up") {
                myQuote.vote++;
            } else {
                myQuote.vote--;
            }
            author.save(err => {
                if(err) {
                    res.json(err);
                } else {
                    res.json(author);
                }
            });
        }
    });
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve("./public/dist/index.html"));
});

app.listen(8000, () => {
    console.log('Server listening on port 8000.');
});
