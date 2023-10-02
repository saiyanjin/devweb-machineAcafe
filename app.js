import { renewTag, delay, injectElements } from "./functions/dom.js";

const wrapper = document.querySelector('#controle');

let started = false; 
let moneyInMachine = 0; 
let waterSupply = 400; 
let milkSupply = 540; 
let coffeeBeansSupply = 120; 
let cupsSupply = 9; 

let customerMoney = 550;


const etapes = [
    "Commence à faire le café",
    "Mouds les grains de café",
    "Fait chauffer l'eau",
    "Infuse les grains de café moulus",
    "Verse le café dans une tasse",
    "Ajoute un peu de lait dans la tasse",
    "Le café est terminé."
];

const laListe = renewTag('ul');

function start() {
    wrapper.append(laListe);
    injectElements(etapes, laListe);
}

// document.querySelector('#start').addEventListener('click', start)


    const delays = [3000, 5000, 2000, 6000, 2000, 3000, 1000];

    const inputField = document.createElement('input'); 
    inputField.type = 'text';
    inputField.placeholder = 'Entrez le nombre de tasses...';
    wrapper.append(inputField, laListe);
    const buyButton = document.createElement('button');
    buyButton.textContent = 'Acheter';
    wrapper.append(buyButton);

    const fillButton = document.createElement('button');
    fillButton.textContent = 'Remplir';
    wrapper.append(fillButton);

    const takeButton = document.createElement('button');
    takeButton.textContent = 'Prendre';
    wrapper.append(takeButton);

    const resultDisplay = document.createElement('div');
    resultDisplay.id = 'ingredientQuantities';
    wrapper.append(resultDisplay);

    async function displaySteps() {
        await injectElements(etapes, laListe, delays);
    }

    buyButton.addEventListener('click', () => {
        const numberOfCups = parseInt(inputField.value, 10); 
        if (!isNaN(numberOfCups)) {
            
            const coffeeType = prompt('Choisissez le type de café : expresso, latte, cappuccino');
            if (coffeeType) {
                buyCoffee(numberOfCups, coffeeType.toLowerCase());
                displaySuppliesQuantities();
            } else {
                alert('Veuillez choisir un type de café.');
            }
        } else {
            alert('Veuillez entrer un nombre valide de tasses.');
        }
    });

    fillButton.addEventListener('click', () => {
        fillSupplies();
        displaySuppliesQuantities();
    });

    takeButton.addEventListener('click', () => {
        takeMoney();
        displaySuppliesQuantities();
    });
    function buyCoffee(numberOfCups, coffeeType) {
        let waterNeeded, milkNeeded, coffeeBeansNeeded, costPerCup;
    
        switch (coffeeType) {
            case 'expresso':
                waterNeeded = 250;
                milkNeeded = 0; 
                coffeeBeansNeeded = 16; 
                costPerCup = 4; 
                break;
            case 'latte':
                waterNeeded = 350; 
                milkNeeded = 75; 
                coffeeBeansNeeded = 20; 
                costPerCup = 7; 
                break;
            case 'cappuccino':
                waterNeeded = 200; 
                milkNeeded = 100; 
                coffeeBeansNeeded = 12; 
                costPerCup = 6; 
                break;
            default:
                alert('Type de café non reconnu. Veuillez choisir entre expresso, latte ou cappuccino.');
                return; 
        }
    
        const totalWaterNeeded = waterNeeded * numberOfCups;
        const totalMilkNeeded = milkNeeded * numberOfCups;
        const totalCoffeeBeansNeeded = coffeeBeansNeeded * numberOfCups;
        const totalCost = costPerCup * numberOfCups;
    
        
        if (
            waterSupply >= totalWaterNeeded &&
            milkSupply >= totalMilkNeeded &&
            coffeeBeansSupply >= totalCoffeeBeansNeeded &&
            cupsSupply >= numberOfCups &&
            customerMoney >= totalCost
        ) {
            waterSupply -= totalWaterNeeded;
            milkSupply -= totalMilkNeeded;
            coffeeBeansSupply -= totalCoffeeBeansNeeded;
            cupsSupply -= numberOfCups;
            customerMoney -= totalCost;
            moneyInMachine += totalCost;

        alert(`Vous avez acheté ${numberOfCups} tasse(s) de ${coffeeType}.`);
        alert(`argent restant ${customerMoney} euros`);
        displaySteps();
    } else {
        alert("Stock insuffisant ou solde insuffisant. Veuillez vérifier les fournitures et l'argent dans la machine.");
    }
}


    
    

    function fillSupplies() {
        const waterToAdd = parseInt(prompt('Quantité d\'eau à ajouter (en ml):'), 10) || 0;
    
        const milkToAdd = parseInt(prompt('Quantité de lait à ajouter (en ml):'), 10) || 0;
    
        const coffeeToAdd = parseInt(prompt('Quantité de café à ajouter (en g):'), 10) || 0;
    
        const cupsToAdd = parseInt(prompt('Nombre de tasses jetables à ajouter:'), 10) || 0;
    
        waterSupply += waterToAdd;
        milkSupply += milkToAdd;
        coffeeBeansSupply += coffeeToAdd;
        cupsSupply += cupsToAdd;
    
        alert(`Fournitures ajoutées : ${waterToAdd} ml d'eau, ${milkToAdd} ml de lait, ${coffeeToAdd} g de café. ${cupsToAdd} tasses jetables ajoutées.`);
    }
    

    function takeMoney() {
        alert(`Vous avez gagnés ${moneyInMachine} euros en vendant du café.`);
        customerMoney += moneyInMachine;
        moneyInMachine = 0;
    }

    function displaySuppliesQuantities() {
        const suppliesDisplay = `La machine à café contient :\n
            -> Argent dans la machine : ${moneyInMachine} €\n
            -> Quantité en eau : ${waterSupply} ml\n
            -> Quantité en lait : ${milkSupply} ml\n
            -> Quantité en grains de café : ${coffeeBeansSupply} g\n
            -> Nombre de tasses jetables : ${cupsSupply}`;
        
        alert(suppliesDisplay);
    }
    
