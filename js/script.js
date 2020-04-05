/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// How many students can be shown per page.
const maxPerPageStu = 10;

// Stores the student list item elements in the student list.
const stuList = document.querySelectorAll('.student-item');

// Determines how many pages should be created. It rounds up the result. i.e 5.4 -> 6
const totalPageCount = Math.ceil(stuList.length / maxPerPageStu);

// Selects and creates a reference to an existing div element with the class 'page'.
const divPageSelect = document.querySelector('.page');

// Prints status
console.log(`There are currently ${stuList.length} students imported into the script. This should create a total of ${totalPageCount} page(s).`);

// Creates a function named showPage which will determine which entries to show/hide
const showPage = (list, page) => {
    // Determines starting and ending points
    let startIndex = ( page * maxPerPageStu ) - maxPerPageStu;
    let endIndex = page * maxPerPageStu;

    // Goes over every student item and displays it if they are satisfying the IF criteria
    for ( let i = 0; i < list.length; i++ ) {
        if ( i >= startIndex && i < endIndex ) {
            list[i].style.display = 'block';
        } else {
            // If an entry is outside of the criteria, it is hidden.
            list[i].style.display = 'none';
        }
    }
};

// Initializes a function named appendPageLinks that creates HTML elements in the page
const appendPageLinks = (list) => {

    // Creates a new div element and assigns it to 'createDiv' variable
    let createDiv = document.createElement('div');

    // Adds a new class value of 'pagination' to 'createDiv' variable
    createDiv.classList.add('pagination');

    // Appends the processed 'createDiv' (as a child) to existing div element with the class 'page'
    divPageSelect.appendChild(createDiv);

    // Creates a new ul element, and assigns the value to the createUL variable
    let createUL = document.createElement('ul');

    // Appends the newly created ul element to createDiv
    createDiv.appendChild(createUL);

    // Creates a new for loop that runs until it reaches the total number of entries in a page (totalPageCount)
    for ( let i = 0; i < totalPageCount; i++ ) {

        // Creates a new li element and assigns it to createLI variable
        let createLI = document.createElement('li');

        // Appens the newly created li element to the ul which was created earlier
        createUL.appendChild(createLI);

        // Creates a new 'a' element and assigns it to createA variable.
        let createA = document.createElement('a');

        // Sets createA's ('a' element) href to '#'.
        createA.href = '#';

        // Sets createA's textContent to the current index number in the loop plus one (because it normally starts from zero, but we want to start the page count from 1)
        createA.textContent = i + 1;

        // Checks to see if the index number is equal to 0. If it is, it will assign a class name 'active' to it, since this will be our first page and needs the blue highlight.
        if ( i === 0 ) {
            createA.classList.add('active');
        }

        // When the all processing of createA is complete, this line appends the newly processed 'a' element to our li element (as a child)
        createLI.appendChild(createA);

        // Creates a new event listener on createA, and listens for clicks.
        createA.addEventListener('click', (e) => {

            // Finds the first query that has the class name 'active' and assigns the result to the accessActive variable. Since there is only going to be 1 active at a time, we are not using querySelectorAll here.
            let accessActive = document.querySelector('.active');

            // Removes the 'active' class from the current 'a' element.
            accessActive.classList.remove('active');

            // Finds which 'a' is triggered and assigns it a new class name 'active'.
            e.target.classList.add('active');

            // Takes the arguments that was passed in as 'list' (which is actually stuList that represents all students) and provides the 'page' argument with the current/triggered 'a' element's number. Calls the showPage() function.
            showPage(list, e.target.textContent);
            console.log(`Current page: ${e.target.textContent} / ${totalPageCount}`)
        });
    }
};

// Calling the functions at the bottom of my page, because arrow functions are not hoisted, so I cannot access them before initializing.

// Calling the function to provide pagination function.
// appendPageLinks(list)
appendPageLinks(stuList);

// Calling the function here so it does not display all students, but only the first 10 (page 1)
// showPage(list, page)
showPage(stuList, 1);
