
/*1. La methode "getPosition" est indispensable pour recuperer les positions sur l'axe X et Y du pointeur de la souris (ou même du doigt)
Sans cette derniere, il y aurait un decalage entre le trace du dessin et le pointeur de la souris egal a la difference entre la position du canvas et celle de l'extremite haut et gauche de l'ecran 
2. La largeur et la hauteur du canvas sont definies en dur dans le HTML avec des valeurs completement petees (1000px et 1000px), et c'est normal
Cela a son utilite pour le responsive design car il est lui meme place dans un conteneur en position relative (le canvas est en absolute), avec une largeur en % et avec un "overflow: hidden"
3. Le principe de traitement des events de type "touch" implique que chaque evenement "touch" deviendra un evenement "mouse" par une methode de transformation */

/* ---------------------------------------------------------------------------- */

class Signature {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.signature = document.getElementById("signature");
		this.boutonreset = document.getElementById("boutoncanvasreset");
		this.boutonConfirmerResa = document.getElementById("boutoncanvasconfirmer");
		this.boutonAnnulerReservation = document.getElementById("confirmation");// button pour clear le canvas 
		
		this.initControles();
		this.effacerCanvas();
		this.dessin = null; // Il nous faut un parametre variable permettant à l'application de dessiner ou non
		this.ctx = this.canvas.getContext("2d"); // Pour definir le contexte 2D du canvas lors de l'initialisation de la methode "dessiner"

	};

	
			

	getPosition(e) { // Une methode de la classe pour recuperer les coordonnees exactes du pointeur en fonction du type de l'event (touch ou souris)
		var typeE = e.type; //j'ai utiliser ca parceque ca retourne une chaîne de caractères type (string)

		var rect = this.canvas.getBoundingClientRect(); // Permet de prendre en compte l'emplacement de l'objet par rapport au viewport
		if (typeE === "mousemove") {//j'ai utilisé les évènement (mousemove ,mousedown,...) qui permet à l'utilisateur de dessiner
			return {
				x: e.clientX - rect.left, // pour obtenir l'emplacement exacte du point
				y: e.clientY - rect.top
			};

		} else {
  			return {
			    x: e.touches[0].clientX - rect.left,//j'ai utilisé ca pour pour obtenir l'emplacement exacte du point.
			    y: e.touches[0].clientY - rect.top
		  	};
		};
	};

	effacerCanvas(){
            this.boutonAnnulerReservation.addEventListener('click', () =>{
                this.ctx.clearRect(0, 0, 1000, 1000);

            });
        };

	movePosition(e) { // Specifique a la souris
		var positionSouris = this.getPosition(e);//pour deplacer la souris dans le canvas je veux appliqué les parametres de (getposition) et (dessiner) a la position de la souris. 
		var positionX = positionSouris.x;
		var positionY = positionSouris.y;
		this.dessiner(positionX, positionY);
	};

	transformEvent(e) { // Il s'agit dans cette methode de convertir les evenements de type "touch" en type "souris"
		var typeE = e.type; //j'ai utiliser ca parceque ca retourne une chaîne de caractères type (string)
		if (typeE === "touchstart") {
			var mouseEvent = new MouseEvent("mousedown", {}); // "touchstart" devient un "mousedown" grace a la puissance de Son Goku
			this.canvas.dispatchEvent(mouseEvent); // Methode qui distribue le nouvel event 
		
		} else if (typeE === "touchend") {
			var mouseEvent = new MouseEvent("mouseup", {}); // "touchend" devient un "mouseup" ()
			this.canvas.dispatchEvent(mouseEvent);
		} else if (typeE === "touchmove") {
			var touch = e.touches[0]; // Le premier doigt
 			var mouseEvent = new MouseEvent("mousemove", { // "touchmove" devient un "mousemove" ()
	    		clientX: touch.clientX,
	    		clientY: touch.clientY
	  			});
  			this.canvas.dispatchEvent(mouseEvent);
  			
		};
	};

	startDessin(e) {
		this.dessin = true; // Le parametre permettant de dessiner passant a true, notre condition dans la methode "dessiner" est realisee
		this.dessiner(e); // Ordonne d'utiliser la methode dessiner
		this.boutonreset.classList.remove("invisible");
		this.boutonConfirmerResa.classList.remove("invisible");

	};

	endDessin() { // A l'inverse de la methode precedente, on arrete le dessin
		this.dessin = false; // La methode "dessiner" s'arrete
		this.ctx.beginPath(); // Pour eviter de relier 2 dessins entre eux
	};

	dessiner(positionX, positionY) { // Notre methode moteur pour dessiner
		if(!this.dessin) return; // Si le parametre "dessin" vaut false, met automatiquement fin a la methode
		this.ctx.lineWidth = 3;
		this.ctx.lineCap = "round";
		this.ctx.strokeStyle = "rgb(51, 51, 51)";

		this.ctx.lineTo(positionX, positionY); // Permet de tracer une ligne entre les deux positions
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(positionX, positionY);
	};

	reinitialiser() { // Une methode pour nettoyer le canvas, très utile et reutilisable.
		this.ctx.clearRect(0, 0, 1000, 1000);
		this.boutonreset.classList.remove("invisible");
		this.boutonConfirmerResa.classList.remove("invisible");
	};

	initControles() {
		this.canvas.addEventListener("mousedown", this.startDessin.bind(this)); // Souris relachee : arret du dessin
		document.addEventListener("mouseup", this.endDessin.bind(this)); // L'evenement est ici place sur le document et non le canvas, sinon, si on quitte le canvas avec la souris enclenchee, lorsque l'on revient sur celui ci, il faut recliquer pour arreter le trace
		this.canvas.addEventListener("mousemove", this.movePosition.bind(this)); // Souris en deplacement : trace en cours jusqu'au prochain event "mouseup"
		
		this.canvas.addEventListener("touchstart", this.transformEvent.bind(this)); // On transforme les events "touch" en "souris"
		document.addEventListener("touchend", this.transformEvent.bind(this));
		this.canvas.addEventListener("touchmove", this.transformEvent.bind(this));

		this.boutonreset.addEventListener("click", this.reinitialiser.bind(this)); // Une possibilite manuelle pour clean le canvas

		this.canvas.addEventListener("touchstart", function(e) { // prevenir les conflits d'events "touch" et "scroll" sur mobile (pour eviter le carré de canvas de bouger au scroll)
				e.preventDefault();
		}, false);
		this.canvas.addEventListener("touchend", function(e) {
				e.preventDefault();
		}, false);
		this.canvas.addEventListener("touchmove", function(e) {
				e.preventDefault();
		}, false);
	};
	
};
let signature = new Signature('canvas')
