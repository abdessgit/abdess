class Map {
	constructor(maMap,marker,station){
		this.lat = 49.89454198;
		this.long =	2.29104764;
		this.maMap = maMap;
		this.marker = marker;
		this.station = station;

		this.init();
		this.chargeApi();
		
	}

	init()	{ /// Methode pour faire apparaitre la map sur la page
			this.maMap = L.map('blocmap').setView([49.89454198, 2.29104764], 13 );

				L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
				    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				    maxZoom: 18,
				    id: 'mapbox/streets-v11',
				    tileSize: 512,
				    zoomOffset: -1,
				    accessToken: 'pk.eyJ1IjoiYWJkZXNzIiwiYSI6ImNrYTZyY2h5dDA5bjMycnBuZ3p1N29rMjQifQ.5O_JqORo24F5j9JtNNnBgA'
				}).addTo(this.maMap);
				            
		}

				
	chargeApi() { 

            // let marker = L.marker([this.lat, this.long], 12).addTo(this.maMap);
            let maMap = this.maMap;
          	

            let xhr = new XMLHttpRequest();

            let url ="https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=cef3fad0dcdd8d54a48bd34ce3ef4ef4bb3b13a2";

            xhr.open ("GET" ,url,true );

            xhr.addEventListener("load", () => {
            	//on récupere les éléments du fichier JSON sous forme de tableau. 
                let stations = JSON.parse(xhr.responseText);
                stations.forEach(station => { //pour récupérer les détail de chaque station
                

                 	let coordLat = station.position.lat;
                    let coordLng = station.position.lng;
                    let stationName = station.name;
                    let statusStation = station.status;
                    let velosDispo = station.available_bikes;
                    let adresse = station.address.toLowerCase();
					let placesDispo = station.available_bike_stands;


					let marker = L.marker ([coordLat,coordLng],{"jcdecaux":station})
						.bindPopup("<b>"+stationName+"</b><br>"+statusStation+"<br>"+adresse+"<br>");
						marker.addTo(maMap);
                    // 1er étape : clique sur un marker 
                    //pour récupérer les infos sur les différents marqueurs  

                   	marker.on("click", this.markerClick)
                    .bindPopup("<b>"+stationName+"</b><br>"+statusStation+"<br>"+adresse+"<br>");
						marker.addTo(maMap);

                   
                }) 
                
            });

            xhr.send();

        }
        markerClick(e) {
        	
            let marker = e.target;//lorsque je fait le console log (marker) j'ai mes marqueur qui s'affiche dans ma console  
        	
        	let station = marker.options.jcdecaux;
        	
        		const stationName = document.getElementById('nomstation');
        		const statusStation = document.getElementById('statutstation');
        		const adresse = document.getElementById('adressestation');
        		/*document.getElementById('adressestation');*/
        		adresse.innerHTML = station.adressestation;
        		statusStation.innerHTML = station.statutstation;
        		stationName.innerHTML = station.nomstation;
        		
        	console.log(adresse);
        }

        
     
}
		

let map = new Map(); 





