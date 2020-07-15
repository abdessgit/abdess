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
                

                 	this.coordLat = station.position.lat;
                    this.coordLng = station.position.lng;
                    this.stationName = station.name;
                    this.statusStation = station.status;
                    this.velosDispo = station.available_bikes;
                    this.adresse = station.address.toLowerCase();
		            this.placesDispo = station.available_bike_stands;
                    

					this.marker = L.marker ([this.coordLat,this.coordLng],{"jcdecaux":station},{icone:this.icone})
						
                    // 1er étape : clique sur un marker 
                    //pour récupérer les infos sur les différents marqueurs  

                   	this.marker.on("click", this.markerClick)
                    .bindPopup("<b>"+station.name+"</b><br>"+this.adresse+"<br>"+station.available_bikes+"<br>");
						this.marker.addTo(this.maMap);
                    
                        
                }); 
                
            });

            xhr.send();

        }


        markerClick(e) {
        	 
            this.marker = e.target;//récuperer tout les marqueurs.   
        	
        	this.station = this.marker.options.jcdecaux;//récuperer les information de la station.
	
        		this.adresse = document.getElementById('adressestation');//afficher l'adresse de station.
        		this.stationName = document.getElementById('nomstation');//afficher le nom de la station.
        		this.placesDispo = document.getElementById('nombreplacesdisponibles');//afficher le nombre de place disponible.
        		this.velosDispo = document.getElementById('nombrevelosdisponibles');//afficher le nombre des place disponible.
        		

        			this.adresse.innerHTML = this.station.address;
                    this.stationName.innerHTML = this.station.name;
                    this.placesDispo.innerHTML = this.station.available_bike_stands;
                    this.velosDispo.innerHTML = this.station.available_bikes;


                    this.statusStation = document.getElementById('statutstation');//afficher le status de la station.
                  
                    this.marker.addEventListener('click', function (){
                        document.querySelector('.dnone').style.display = "block";
                        document.getElementById('signature').style.display = "flex"; 
                   if(this.station.available_bikes >= 7 ){
                        this.statusStation.textContent = "STATION OUVERT";
                         document.getElementById('statutstation').style.color = "green"
                        document.getElementById('boutonsubmit').style.display = "block"; 
                        };
                    if(this.station.available_bikes <= 6 ){ 
                     
                        this.statusStation.textContent = "STATION FERMER";
                        document.getElementById('statutstation').style.color = "red"
                        document.getElementById('boutonsubmit').style.display = "none"; 
                        } ;
                     
        		
		 	        });


        };

        /*donnesStation(){
           

            this.boutonConfirmerResa.addEventListener('click',  () =>{
                if(this.velosDispo = this.station.available_bikes){
                    this.station.available_bikes--;
                }


            });
        }*/
        



}


		

let map = new Map(); 
