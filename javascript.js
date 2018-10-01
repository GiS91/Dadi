"use strict";

document.addEventListener("DOMContentLoaded", function(e) {

    // DEFINIZIONE DI TUTTE LE VARIABILI E LE FUNZIONI UTILIZZATE NEL GIOCO
    var clickCounter = 0;
    var matchCounter = 1;

    const GIOCATORE1 = document.querySelector("#giocatore1");
    const GIOCATORE2 = document.querySelector("#giocatore2");
    const leftButtons = document.getElementById("left-buttons");
    const rightButtons = document.getElementById("right-buttons");
    const diceNumberAdded = document.querySelector("#diceNumberAdded");
    const centralInput = document.querySelector(".central-input");
    const animationTimer = 1000;

    let randomNumbers = [];

    function randomNumber(min, max) {
        clickCounter = clickCounter + 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function animateDice() {
        document.querySelector("#dice").setAttribute("class", "dice-animation");

        setTimeout(function() {
            document.querySelector("#dice").classList.remove("dice-animation");
        }, animationTimer);

    }

    function addNumberToDice(number) {

        setTimeout(function() {

            diceNumberAdded.setAttribute("class", "dice-number");

            diceNumberAdded.classList.remove("dot");


            diceNumberAdded.innerHTML = number;

        }, animationTimer);

    }

    function restoreDiceClassesAndDiv() {
        diceNumberAdded.setAttribute("class", "dot");
        diceNumberAdded.classList.remove("dice-number");

    }

    function compareNumbers() {
        if (randomNumbers[0] < randomNumbers[1]) {
            console.log("Il giocatore 2 ha vinto");
        } else if (randomNumbers[0] == randomNumbers[1]) {
            console.log("Pari");

        } else {
            console.log("Il giocatore 1 ha vinto");

        }

    }


    //GIOCATORE 1

    GIOCATORE1.addEventListener("click", function(e) {
        e.preventDefault();

        let generatedNumber1 = 0;
        let radioLeft = document.querySelector('input[name="left-radio"]:checked').getAttribute("max");

        if (Math.abs(clickCounter % 2) == 1) {

            alert("Hai già tirato il dado, testina. Lascia giocare anche il giocatore 2, no?");

        } else

        {
            restoreDiceClassesAndDiv();

            animateDice();


            if (radioLeft == 100) {
                /* Se il range dei numeri generati è 100, allora il max range viene impostato su 10 (non più 100) e il numero random generato in questo
                					 nuovo range viene moltiplicato per 10.			*/
                radioLeft = 10;
                generatedNumber1 = randomNumber(1, radioLeft);
                randomNumbers[0] = generatedNumber1 * 10;

            } else {
                generatedNumber1 = randomNumber(1, radioLeft);
                randomNumbers[0] = generatedNumber1;
            }

            addNumberToDice(randomNumbers[0]);
            console.log(`Partita ${matchCounter}: \nIl giocatore 1 ha lanciato ${randomNumbers[0]}`); //Template literal che porta il conteggio delle partite
            matchCounter++;
        }


    }, false);

    // INPUT CENTRALE

    centralInput.addEventListener('keypress', function(e) {


        let valid = e.which > 31 && (e.which < 48 || e.which > 57) // Comunemente, input type="number" è sufficiente ad impedire l'inserimento di caratteri che non siano numeri.
                                                                     // Per un support cross-vrowser, è necessario definire una funzione in keypress per consentire l'inserimento di soli numeri
        if (valid) {
            e.preventDefault();}
        
    }, false);

    //GIOCATORE 2

    GIOCATORE2.addEventListener("click", function(e) {
        e.preventDefault();

        let generatedNumber2 = 0;
        let radioRight = document.querySelector('input[name="right-radio"]:checked').getAttribute("max");
        let centralInputValue = Number(centralInput.value);


        if (clickCounter % 2 == 0) {

            alert("Il primo a lanciare deve essere il giocatore 1");

        } else

        {

            restoreDiceClassesAndDiv();

            animateDice();

            if (radioRight == 100) {
                /* Se il range dei numeri generati è 100, allora il max range viene impostato su 10 (non più 100) e il numero random generato in questo
                                     nuovo range viene moltiplicato per 10.         */
                radioRight = 10;
                generatedNumber2 = randomNumber(1, radioRight);
                randomNumbers[1] = generatedNumber2 * 10+centralInputValue;

            }

            else {
            generatedNumber2 = randomNumber(1, radioRight);
            randomNumbers[1] = generatedNumber2 + centralInputValue;
            }
            addNumberToDice(randomNumbers[1]);
            console.log("Il giocatore 2 ha lanciato:" + " " + randomNumbers[1]);
            compareNumbers();

        }


    }, false);


}, false)