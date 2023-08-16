const express = require('express')
const { PrismaClient } = require('./prisma/generated')

const prisma = new PrismaClient()
const exp = express()

exp.use(express.json())

// GET -> Listar todos os filmes
exp.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
})

// POST -> Criar filmes
exp.post('/movies', async (req, res) => {
    const reqData = req.body // lista 
    const createdMov = []

    for (const data of reqData) {
        const { title, director, year } = data
        const movie = await prisma.movie.create({
            data: {title, director, year}
        })
        createdMov.push(movie)
    }
    res.json(createdMov)
})

// PUT -> Update das informações de um filme
exp.put('/movies/:id', async (req, res) => {
    const { id } = req.params
    const { title, director, year } = req.body
    const movie = await prisma.movie.update({
        where: { id: parseInt(id) },
        data: { title, director, year },
    })
    res.json(movie)
})

// PATCH -> Atualizar parcialmente informações
exp.patch('/movies/:id', async (req, res) => {
    const { id } = req.params
    const { title, director, year } = req.body
    const movie = await prisma.movie.update({
        where: { id: parseInt(id) },
        data: { title, director, year },
    })
    res.json(movie)
})

// DELETE -> Deletar filme
exp.delete('/movies/:id', async (req, res) => {
    const { id } = req.params
    await prisma.movie.delete({
        where: { id: parseInt(id) },
    })
    res.json({ message: 'Filme deletado' })
})

// SÉRIES //

// GET -> Listar todas as séries
exp.get('/series', async (req, res) => {
    const series = await prisma.series.findMany()
    res.json(series)
})

// POST -> Criar uma nova série
exp.post('/series', async (req, res) => {
    const reqData = req.body // lista de séries
    const createdSeries = []

    for (const data of reqData) {
        const { title, director, year, seasons, episodes } = data
        const series = await prisma.series.create({
            data: {title, director, year, seasons, episodes}
        })
        createdSeries.push(series)
    }
    res.json(createdSeries)
})

// PUT -> Atualizar informações de uma série
exp.put('/series/:id', async (req, res) => {
    const { id } = req.params
    const { title, director, year, seasons, episodes } = req.body
    const series = await prisma.series.update({
        where: { id: parseInt(id) },
        data: { title, director, year, seasons, episodes },
    })
    res.json(series)
})

// PATCH -> Atualizar parcialmente a série
exp.patch('/series/:id', async (req, res) => {
    const { id } = req.params
    const { title, director, year, seasons, episodes } = req.body
    const series = await prisma.series.update({
        where: { id: parseInt(id) },
        data: { title, director, year, seasons, episodes },
    })
    res.json(series)
})

// DELETE -> Deletar uma série
exp.delete('/series/:id', async (req, res) => {
    const { id } = req.params
    await prisma.series.delete({
        where: { id: parseInt(id) },
    })
    res.json({ message: 'Série deletada' })
})

exp.listen(4000, () => {
    console.log('Servidor rodando: http://localhost:4000')
})