const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { rateLimit } = require('express-rate-limit');


const app = express();
const PORT = process.env.PORT || 3000;
const timeout = process.env.CAT_API_TIMEOUT || 5000;

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

async function getFact() {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeout);

	try {
		const data = await fetch(process.env.CAT_API_URL || "https://catfact.ninja/fact", { signal: controller.signal });
		clearTimeout(timeout);

		if (!data.ok) {
                	console.error("Uable to fetch fact");
			throw new Error("Cat API request failed");
        	}


        	const response = await data.json();
		clearTimeout(timer);
        	return (response);
	} catch (error) {
			clearTimeout(timeout);
			throw error;
		}
}

app.use((req, res, next) => {
        console.log(`${req.method} - ${req.url} at ${new Date().toISOString()}`);
        next();
});


app.get("/me", async (req, res) => {
        try {
                const data = await getFact();
                const info = {
			status: "success",
			user: {
                        email: process.env.USER_EMAIL,
			name: process.env.USER_NAME,
                        stack: process.env.USER_STACK,
			},
			timestamp: new Date().toISOString(),
			fact: data.fact.fact
		}


                res.status(200).json(info);
        } catch (err) {
		console.error('Cat API error:', err.message);

		if (err.code === "ECONNABORTED") {
			return res.status(504).json({
				suucess: false,
				message: "The Cat Facts API took too long to respond"
			});
		} else if (err.response) {
			return res.status(err.response.status).json({
				success: false,
				message: "Failed To Fetch The Cat Fact From The API."
			});
		} else {
			res.status(500).json({
				succes: false,
				message: "Unable To Fetch The Cat Fact At The Moment. Try Again Later."

			});
		}
        }
});

app.listen(PORT, () => {
        console.log("Server running on localhost:3000");
});
