class Slider {
	constructor() {
		//les selecteurs
		this.prev = document.querySelector(".carousel-control-prev");
		this.next = document.querySelector(".carousel-control-next");
		this.images = document.querySelector(".carousel-inner").children;
		this.pause = document.querySelector("#pause");
		this.play = document.querySelector("#play");
		this.indicator = document.querySelector(".indicator");
		/*les evenements, les methodes pour gerer l'affichage */
		this.slideAuto = null;
		this.currentSlide = 0 ;
		this.vitesse = 5000;
		this.reset();
		this.initControles(); 
		this.Indicator();
	}
		
	reset() {//Methode essentielle qui permet dafficher le slider et de le reinitialiser 
		for (let i = 0; i < this.images.length; i++) {
			this.images[i].classList.remove("active");
		};

		if (this.currentSlide == this.images.length ) {
			this.currentSlide = 0;
		};
		if (this.currentSlide == -1) {
			this.currentSlide = this.images.length -1;

		};
			this.images[this.currentSlide].classList.add("active");
		
	};
	Indicator(){//methode qui traites le changement des indicateurs
		for(let i=0; i< this.indicator.children.length; i++){
			this.indicator.children[i].classList.remove("active");
		}

		this.indicator.children[this.currentSlide].classList.add("active");
	}

	initControles() { // Methode pour tous les evenements (4 boutons + les deux touches de clavier)
		this.prev.addEventListener("click", this.leftSlide.bind(this)); 
		this.next.addEventListener("click", this.rightSlide.bind(this));
		this.play.addEventListener("click", this.playSlide.bind(this));
		this.pause.addEventListener("click", this.pauseSlide.bind(this));
		document.addEventListener("keydown", this.clavierSlide.bind(this));
		this.slideAuto = setInterval(this.rightSlide.bind(this), this.vitesse);
		
	};

	rightSlide() { // Methode pour l'images suivante
		this.currentSlide++;
		this.reset();
		this.Indicator()
	};

	leftSlide() { // Methode pour l'images précidente
		this.currentSlide--;
		this.reset();
		this.Indicator()
	};
	playSlide() { // Methode pour le bouton play 
		this.play.classList.add("active");
		this.pause.classList.remove("active");
		this.slideAuto = setInterval(this.rightSlide.bind(this), this.vitesse);
	};

	pauseSlide() { // Methode pour le bouton pause
		this.pause.classList.add("active");
		this.play.classList.remove("active");
		clearInterval(this.slideAuto);
	};
	clavierSlide(e) { // Methode qui traite les touches clavier
		if (e.key === "ArrowLeft") { 
		this.leftSlide();
		} else if (e.key === "ArrowRight") {
		this.rightSlide();
		}
	};

};

let carousel = new Slider("#carouselExemple" );
