/*
Problem : A customer order an ice scream with some request: Strawberry taste, 
holder is cup and have topping chocolate. 

We use setTimeout method to simulation the execution time
Processing :
    step 1. customer Order    : take 4 seconds
    step 2. Cut the Fruit     : take 3 seconds
    step 3. Add water and ice : take 1 seconds
    step 4. Start the machine : take 1 seconds
    step 5. Select container  : take 2 seconds
    step 6. select toppings   : take 3 seconds
    step 7. serve             : take 2 seconds    
*/

let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"],
};

let is_shop_open = false;

const works = (time, work) => {
    return new Promise((resolve, reject) => {
        if (is_shop_open) {
            setTimeout(() => {
                resolve(work());
            }, time);
        } else reject(console.log("Sorry, shop is closed"));
    });
};

works(4000, () => {
    console.log(`Fruit: ${stocks.Fruits[0]} was selected`);
    console.log(`Holder: ${stocks.holder[1]} was selected`);
    console.log(`Topping: ${stocks.toppings[0]} was selected`);
})
    .then(() => {
        console.log("Customer selected infredients, let started production");
        return works(3000, () => {
            console.log(`${stocks.Fruits[0]} was cut`);
         });
    })

    .then(() => {
        return works(1000, () => {
            console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`)
        })
    })

    .then(() => {
        return works(1000, () => {
            console.log("Machine is ready to start")
        })
    })

    .then(() => {
        return works(2000, () => {
            console.log(`${stocks.holder[1]} was added`)
        })
    })

    .then(() => {
        return works(3000, () => {
            console.log(`${stocks.toppings[0]} was added`)
        })
    })

    .then(() => {
        return works(2000, () => {
            console.log("Serve ice scream")
        })
    })

    .catch(() => {
        console.log("customer left")
    })