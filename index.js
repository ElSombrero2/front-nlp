import express from 'express'
import { engine } from 'express-handlebars';
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/public', express.static('public'))

app.engine('html', engine());
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'))

app.get('/result', async (req, res) => {
    try{
        const data = new FormData()
        data.append('text', req.query.sentence)
        const result = await axios.post('http://10.163.8.244:9000/sentiment_analysis', data)
        res.render('result', {
            ...req.query,
            ...result.data,
            stats: Math.floor(result.data.Emotion[result.data.Emotion.Sentiment]),
            graph: JSON.stringify({
                Alahelo: parseFloat(result.data.Emotion.Alahelo).toFixed(2),
                Faly: parseFloat(result.data.Emotion.Faly).toFixed(2),
                Gaga: parseFloat(result.data.Emotion.Gaga).toFixed(2),
                Tahotra: parseFloat(result.data.Emotion.Tahotra).toFixed(2),
                Tezitra: parseFloat(result.data.Emotion.Tezitra).toFixed(2),
                Tia: parseFloat(result.data.Emotion.Tia).toFixed(2),
            })
        })
    }catch(e){ res.redirect('/error') }
})

app.get('/error', (req, res) => res.render('error'))

app.post('/log', (req, res) => {
    const log = `${Date.now()} | INFO | ${req.body.sentence} | ${req.body.feeling} | ${req.body._feeling} | ${req.body.polarite} | ${req.body._polarite}\n`
    let file = fs.readFileSync('log', {encoding: 'utf-8'})
    file += log
    fs.writeFileSync('log', file, {encoding: 'utf-8'})
    res.redirect('/')
})

app.use('*', (req, res) => res.redirect('/'))

app.listen(process.env.PORT || 8080)