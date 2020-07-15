/* On retrouve dans cette feuille une classe permettant la creation d'un objet pouvant s'occuper de la gestion des differentes etapes de la reservation
L'application imposant l'utilisation du "localStorage", il etait necessaire d'y integrer une methode permettant d'initialiser au prealable ce dernier (sans ecraser les valeurs initiales en cas de reutilisation) */

/* ---------------------------------------------------------------------------- */

/* UNE CLASSE POUR CREER UN OBJET CAPABLE DE GERER LA RESERVATION */
class Reservation {
    constructor() {
         
        this.formulaireResa = document.getElementById("#formulaire"); 
        this.boutonConfirmerResa = document.getElementById("boutoncanvasconfirmer");
        this.buttonSubmit = document.querySelector('boutonsubmit');
        this.signature = document.getElementById('signature');
        this.blocReservation = document.getElementById('.dnone');
        this.messageconfirmation = document.getElementById('messageconfirmation');
        this.messageannulation = document.getElementById('messageannulation');
        this.veloreservé = document.getElementById('indicReservation');


        this.boutonAnnulerReservation = document.getElementById("confirmation");

        this.titreBlocReCap = document.getElementById("recapitulatif");
        this.blocRecap = document.getElementById("messagerecapitulatif");
        this.compteur = document.getElementById("compteur");

        
        this.inputFirstName = document.getElementById('prenom');//on recuper le prenom de reservant du formulaire 
        this.inputName = document.getElementById('nom');//on recuper le nom de reservant du formulaire 

        this.nomReservant = document.getElementById("nomreservant")// on recupere le nom de reservant qu'on veux afficher sur le recapitulatif.
        this.prenomReservant = document.getElementById("prenomReservant");// on recupere le prenom de reservant qu'on veux afficher sur le recapitulatif.


        this.nomStation = document.getElementById("nomstation");// on recupere le nom de la station qu'on affiche sur le formulaire. 
        this.nomstation2 = document.getElementById("nomstation2");// on recupere le nom de la station qu'on veux afficher sur le recapitulatif.

       
        
        this.reservationEnCours = document.getElementById("reservationEnCours");
       
        
        this.minutesResa = document.getElementById("minutesResa");//on recuper le minuterie (minutes) de reservant du formulaire   

        this.secondesResa = document.getElementById("secondesResa"); //on recuper le minuterie (secondes) de reservant du formulaire 

        
        this.chrono = null;

        
        this.reserva();
        
        this.buttonEnvoyer();
        this.annulleResa();
        
     }; 


    reserva(){// on stock les information de visiteur dans localstorage/sessionstorage. 
         this.boutonConfirmerResa.addEventListener('click', function(){

            let nameValue = document.getElementById('nom').value;//on recupere la valeur de l'id
            let prenomValue = document.getElementById('prenom').value;
            let minuteValue = document.getElementById('minute');
            let secondeValue = document.getElementById('seconde');
            

            let nomstationValue = document.getElementById("nomstation").innerHTML;//on recuper les information de reservant.
            let nomreservant = document.getElementById('nom').innerHTML;
            let prenomReservant = document.getElementById('prenom').innerHTML;
            

            if (nameValue && prenomValue ){
                localStorage.setItem('nom', nameValue);//on stock nos information sur localstorage
                localStorage.setItem('prenom', prenomValue);
               

                sessionStorage.setItem('nomStation',nomstationValue);//on stock nos information sur sessionstorage.
                sessionStorage.setItem('nomreservant',nameValue);
                sessionStorage.setItem('prenomReservant',prenomValue);
                /*sessionStorage.setItem('minutes',minuteValue);*/
                /*sessionStorage.setItem('secondes',secondeValue);*/

                this.nomstation2.innerHTML = `${sessionStorage.nomStation}`;// on affiche les informations de reservant sur les recapitulatif.
                this.nomReservant.innerHTML = `${sessionStorage.nomreservant}`;
                this.prenomReservant.innerHTML = `${sessionStorage.prenomReservant}`;

                this.chronometre();
                this.boutonAnnulerReservation.classList.remove("invisible");
                this.titreBlocReCap.classList.remove("invisible");
                this.blocRecap.classList.remove("invisible");
                this.veloreservé.textContent = "1 réservé"
                this.messageconfirmation.textContent = "VOTRE VELO A BIEN ETE RESERVE !";
            }

        }.bind(this));
            
            
      }  

        buttonEnvoyer(){// methode lorsqu'on click sur le button reserver le canvas apparaitre. 
                this.buttonSubmit = document.querySelector('#boutonsubmit');
                this.buttonSubmit.addEventListener('click', () =>{
                this.signature.classList.remove("invisible");   
                });

        }

        annulleResa(){// methode pour annuller la reservation.
            this.boutonAnnulerReservation.addEventListener('click', () =>{

               if (localStorage.reservationEnCours == 0) {// La valeur de ce parametre retombe a 0; 
                this.messageannulation.textContent = "VOTRE RESERVATION A BIEN ETE ANNULEE, A BIENTOT !";
                this.boutonAnnulerReservation.classList.add("invisible");
                this.boutonConfirmerResa.classList.add("invisible");
                this.titreBlocReCap.classList.add("invisible");
                this.blocRecap.classList.add("invisible");
                this.signature.classList.add("invisible");
                this.resetChronometre();// Le chrono est reset.
                    setTimeout( () => {
                        this.messageannulation.classList.add("invisible");
                        }, 3000);
                    }
                    else {
                        this.messageannulation.classList.add("invisible");
                    };
                     
                });
        
        };
        

        chronometre() { // Methode pour le chronometre
            
            this.minutes = 1;
            this.secondes = 0;

            this.compteur = `${this.minutes} minutes et ${this.secondes} secondes`;
            this.chrono = setInterval( function () { // On lance ce maudit chrono !
                     
                    if (this.minutes == 0 && this.secondes == 0 ) {
                        this.resetChronometre();
                       
                            document.getElementById('minutesResa').style.display = "none"; 
                            document.getElementById('secondesResa').style.display = "none"; 
                            document.querySelector('#color').style.display = "none";
                            document.querySelector('#colors').style.display = "none";

                        this.compteur.textContent = "Temps écoulé, veuillez s'il vous plait effectuer une nouvelle réservation";
                         
                        this.reservationEnCours = 0;
                        localStorage.setItem("reservationEnCours", 0); // Une reservation qui atteint sa duree limite disparait du "localStorage"
                        
                    }
                    if (this.secondes == 0) {
                        this.secondes = 59;
                        this.minutes--;
                    }  
                        this.secondes--;
                        
                    localStorage.setItem("minutes", this.minutes); // On envoie l'etat tel quel du compteur dans le "localStorage" pour prevoir la fermeture et la reouverture du navigateur
                    localStorage.setItem("secondes", this.secondes);

                    this.minutesResa.innerHTML = `${localStorage.minutes}`;
                    this.secondesResa.innerHTML = `${localStorage.secondes}`; 
                   
                
                    }.bind(this), 1000);


        };


        resetChronometre() { // Une methode pour remettre "a 0" le chronometre
            
            clearInterval(this.chrono);
            localStorage.removeItem("minutes");
            localStorage.removeItem("secondes");
            this.minutes = 20;
            this.secondes= 0;
           
        };
};


let reserv = new Reservation ('#Reservation')
