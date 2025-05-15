let express = require('express')
let app = express()
let path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
require('dotenv').config();

let port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')))

let posts = [{
    id: uuidv4(),
    user: "Rohit Sharma",
    content: 'I would to love code'
}]

app.get('/', (req, res) => {
  res.redirect('/post');  
});


app.get('/post', (req, res) => {
    res.render('index.ejs', { posts })
})

app.get('/post/create', (req, res) => {
    res.render('create.ejs')
})

app.post('/post', (req, res) => {
    let { user, content } = req.body
    let id = uuidv4()
    posts.push({ id, user, content })
    res.redirect('/post')
})

app.get('/post/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((e) => id === e.id)
    res.render('about.ejs', { post })
})

app.patch('/post/:id', (req, res) => {
    let { id } = req.params;
    let newContetnt = req.body.content
    let post = posts.find((e) => e.id == id)
    post.content = newContetnt
    res.redirect('/post')
})

app.get('/post/:id/update', (req, res) => {
    let { id } = req.params;
    let post = posts.find((e) => id === e.id)
    res.render('update.ejs', { post })
})

app.listen(port, () => {
    console.log(`Port is Runing At: http://localhost:${port}/post`)
})
