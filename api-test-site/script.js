const outputElement = document.getElementById('output-text');

const textbox = document.getElementById('textbox');

const outputs = [document.getElementById('option-1'), document.getElementById('option-2'), document.getElementById('option-3')];

let name = "James"

async function getData() {
	name = textbox.value;
	console.log(name)
	
	const url = "https://api.nationalize.io/?name=" + name
	const age_url = "https://api.agify.io/?name=" + name
	
	const response = await fetch(url);
	const json = await response.json();
	
	const age_response = await fetch(age_url);
	const age_json = await age_response.json();
	
	outputElement.textContent = "You are likely " + age_json["age"] + " years old and from:";
	
	let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
	
	for (i = 0; i < outputs.length; i++){
		outputs[i].textContent = regionNames.of(json["country"][i]["country_id"]) + " (" + Math.round(json["country"][i]["probability"] * 100) + "% chance)";
	}
}
