const express = require("express");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4658;
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
app.use(express.json());

async function createSubmission(obj) {
    const newData = await prisma.submissions.create({
        data : {
            email : obj.email,
            score : parseInt(obj.score),
        }
    })
    console.log(newData);
    return newData;
    
}

async function allSubmissions() {
    const value = await prisma.submissions.findMany();
    return value
}


app.get('/',(req,res)=>{
    res.send("Working");
})

app.post("/submit", async (req, res) => {
    const { email, score } = req.body;
    console.log(`Received email: ${email}, score: ${score}`);
    try {
        const submission = await createSubmission({email, score});
        res.json({ id: submission.id });
    } catch (error) {
        res.status(500).json({ error: "Error Adding your submission" });
    }
});

app.get("/submissions", async (req, res) => {
    try {
        const submissions = await allSubmissions();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching submissions" });
        
    }
});

app.listen(PORT, () => {
    console.log(`Running on : http://localhost:${PORT}`);
});
