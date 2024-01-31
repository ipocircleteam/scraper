import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import scrapeIpoDetails from "./index";

dotenv.config();

const app = express();
const port = process.env.PORT || 6969;

const corsOptions = {
  origin: [
    "*",
    "http://localhost:3000",
    "https://dashboard-ipocircle.vercel.app",
    "https://ipocircle.com",
    "https://dashboard.ipocircle.com",
    "https://www.ipocircle.com",
  ],
  methods: "GET",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
  maxAge: 800,
};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to IPO Circle Scraper API");
});

app.get("/scrapeData", async (req: Request, res: Response) => {
  try {
    await scrapeIpoDetails();
    res.status(200).json({
      success: true,
      message: "Scraped successfully!",
    });
  } catch (error) {
    console.log(`Error running scrapper: \n ${error}`);
    res.status(500).json();
  }
});

app.listen(port, () => {
  console.log(`Scraper service started on ${port}`);
});
