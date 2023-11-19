/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector(".link-list"); 
const itemsPerPage = 9; 


/*
Created the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students. Created a list and page paramenter to represent array of students and page number. In the body function, I created two variables to store a start annd end index of list items needed to be displayed on page. 
selected ul element w/ class of student list and used innerHTML to created empty string and will remove any students that have been displayed. 
Created a for loop to display the student's information in each card using DOM elements.
*/

function showPage(list, page) {
   const start = (page * itemsPerPage) - itemsPerPage;
   const end = (page * itemsPerPage);

    studentList.innerHTML = "";
   
   for (let i = 0; i < list.length; i++) {
      if (i >= start && i < end) {
         const html = `
         <li class="student-item cf">
         <div class="student-details">
         <img class="avatar" src="${list[i].picture.large}" alt="photo of ${list[i].name}">
         <h3>${list[i].name.first} ${list[i].name.last}</h3>
         <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${list[i].registered.date}</span>
         </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}

/*
Created the `addPagination` function.
This function will create and insert/append the elements needed for the pagination buttons.When clicking one of these buttons the showPage function will be called to update the student cards to match the requested page.
created a function called addPagination that added the list parameter to represent the list of students in the array. 
In the body of the function, to store the number of pagination buttons needed. seleted the ul element with class of link-list and created an empty string with innerHTML.This will remove any pagination buttons that might have previously been displayed. In the for loop, looped over the variable that contains number of pages. 
added a event listener to listen for clicks on linkList, ensuring that only one of the buttons will be called if the button is clicked.  
*/
function addPagination(list) {
   let buttonsNeeded = Math.ceil(list.length/itemsPerPage); 
   linkList.innerHTML = ""; 

      for (let i = 1; i <= buttonsNeeded; i++) {
         const html = `
         <li>
         <button type="button">${i}</button>
         </li>
         `;
         linkList.insertAdjacentHTML("beforeend", html);
      }
      linkList.querySelector("button").classList.add("active");
      
      linkList.addEventListener("click", (e) => {
       const buttonClick = e.target.closest('button'); 
       const activeButton = linkList.querySelector('.active');  

         if (buttonClick) {
          activeButton.classList.remove('active'); 
          buttonClick.classList.add('active');
          showPage(list, buttonClick.innerHTML);
         }
      });
};

/* Search Bar- Added search bar by utilizing the header element. Added html and input for the search element through javascript and attaching it to a variable I created called "searchInputHTML". The added the "searchInputHTML" to the searchbox element but made sure it was placed inside the header element but after the first child.
Added an eventlistener to searchBox that is alerted when the user uses a keyboard to type the name in. StudentData was created to create a new empty string for the search. I then created a variable for the id name search which is userInput. I created another variable called searchBar and attached it to userinput and made sure it was lowercase sensitive so the name woukd be found if the name was Uppercase or lowercase. 
Added a for loop to go through the length of data for the students first and last name. When the "Search" is performed, the student data is filtered so that only students whose name includes the search value are shown. The search is case-insensitive and work for partial matches. If no matches are found for a search, display a “No results found” type message on the page. 
*/

const searchBox = document.querySelector('.header'); 

const searchInputHTML = `
<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`
searchBox.insertAdjacentHTML("beforeend", searchInputHTML);

searchBox.addEventListener("keyup", () => {
   const studentData = [];
   const userInput = document.querySelector('#search');
   const searchBar = userInput.value.toLowerCase();

   for (let i = 0; i < data.length; i++) {
      const studentName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`; 
      
      if (studentName.includes(searchBar)) {
         studentData.push(data[i]);
      }
   }
   if (studentData.length > 0) {
      addPagination(studentData);
      showPage(studentData, 1);
   } else {
      const html = "<h3>No Result Found...</h3>"
      linkList.innerHTML = "";
      studentList.innerHTML = html; 

   }
});

/*Call the showPage function and pass it the list and page number to display. */ 
addPagination(data); 
showPage(data, 1);


