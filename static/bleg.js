window.addEventListener('DOMContentLoaded', (event) => {

    let yeet = document.getElementById("button");
    console.log('yeet object', yeet);


    function jon_say_hello() {
        alert("Hello");
    }
    const fn = jon_say_hello;  // EITHER THIS OR say_hello WORKS
    // const fn = say_hello;   // EITHER THIS OR jon_say_hello WORKS
    console.log('Function is', fn);
    yeet.onclick = fn;  // THIS WORKS



    //yeet.onclick = jon_says_hello; // THIS DOES NOT WORK
    //yeet.click(fn)  // THIS DOES NOT WORK
    // yeet.click(jon_says_hello); // THIS DOES NOT WORK
    // yeet.click(say_hello); // THIS DOES NOT WORK

});