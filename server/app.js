const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


async function send(){
    const res = await fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "how are you",
		source: "auto",
		target: "zh",
		format: "text",
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
});
console.log(await res.json());
}

send()
