import app from "./app.ts";


const port = process.env.API_PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})