/* Importation de le clé API à partir du fichier de configuration
	Import the API key from the configuration file */
import config from "./config.js";

/* Déclaration de le clé API et de l'url de base pour l'API OpenWeatherMap
	Declaration of the API key and base URL for the OpenWeatherMap API */
const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

/* Séléction des éléments HTML pour l'entrée de la recherche, le bouton de recherche et l'icône météo
	Selecting HTML elements for search input, search button and weather icon */
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

/* Fonction asynchrone pour vérifier la météo d'une ville donnée
	Asynchronous function to check the weather of a given city */
async function checkWeather(city){
	/* Effectuer la requête fetch à l'API OpenWeatherMap avec la ville et le clé API 
		Perform fetch request to OpenWeatherMap API with city and API key */
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

	/* Vérification du statut de la réponse 
		Checking response status */
	if (response.status == 404){
		/* Si la ville n'est pas trouvée, afficher le message d'erreur et masquer les informations météo
			If the city is not found, show the error message and hide the weather information */
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	}else{
		/*  Si la ville est trouvée, analyser la réponse JSON
			 If city is found, parse JSON response */
		let data = await response.json();

		/* Mettre à jour les éléments HTML avec les données météo 
			Update HTML elements with weather data */
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

		/* Changer l'icône météo en fonction des conditions météorologiques 
			Change the weather icon based on weather conditions */
		if (data.weather[0].main == "Clouds"){
			weatherIcon.src = "../assets/images/clouds.png";
		}
		else if (data.weather[0].main == "Clear"){
			weatherIcon.src = "../assets/images/clear.png";
		}
		else if (data.weather[0].main == "Rain"){
			weatherIcon.src = "../assets/images/rain.png";
		}
		else if (data.weather[0].main == "Drizzle"){
			weatherIcon.src = "../assets/images/drizzle.png";
		}
		else if (data.weather[0].main == "Mist"){
			weatherIcon.src = "../assets/images/mist.png";
		}
	
		/* Afficher les informations météo et masquer le message d'erreur 
			Show weather information and hide error message */
		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	};
};

/* Ajouter un écouteur d'événement au bouton de recherche pour lancer la vérification de la météo 
	Add an event listener to the search button to initiate weather checking */
searchBtn.addEventListener("click", ()=>{
	checkWeather(searchBox.value);
});
