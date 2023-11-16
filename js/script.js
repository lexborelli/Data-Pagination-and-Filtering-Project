/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const studentList = document.querySelector('.student-list');
const itemsPerPage = 9; 

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let buttonsNeeded = Math.ceil(list.length/itemsPerPage); 
   const linkList = document.querySelector(".link-list"); 
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


// Call functions
addPagination(data); 
showPage(data, 1);
