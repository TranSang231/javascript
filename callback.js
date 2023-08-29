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
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
};

let is_shop_open = true;

// get data from customer who choose ingredinets
const order = function orderIceScream(fruit, holder, topping, production) {
    // customer order ice scream
    setTimeout(() => {        
        console.log(`Fruit: ${stocks.Fruits[fruit]} was selected`);
        console.log(`Holder: ${stocks.holder[holder]} was selected`);
        console.log(`Topping: ${stocks.toppings[topping]} was selected`);
    
        production(fruit, holder, topping);
    }, 4000)

}

const production = function productionIceScream(fruit, holder, topping){
    console.log("Customer selected ingredients, let started production")

    setTimeout(() => {
        console.log(`${stocks.Fruits[fruit]} was cut`);
    
        setTimeout(() => {
            console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`)
            
            setTimeout(() => {
                console.log("Machine is ready to start")
            
                setTimeout(() => {
                    console.log(`${stocks.holder[holder]} was added`)
                    
                    setTimeout(() => {
                        console.log(`${stocks.toppings[topping]} was added`)
                        
                        setTimeout(() => {
                            console.log("Serve ice scream");
                        }, 2000)
                    }, 3000)
                }, 2000)        
            }, 1000)
        }, 1000)
    }, 3000)

}

if (is_shop_open) {
    order(0, 1, 0, production);
}
else console.log("Sorry, my shop is closed")
