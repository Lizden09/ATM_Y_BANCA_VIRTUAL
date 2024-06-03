const logo = document.getElementById("logo");
const sideNav = document.querySelector(".side-nav");
const spans = document.querySelectorAll("span");

logo.addEventListener("click", ()=>{
    sideNav.classList.toggle("mini-side-nav")
    spans.forEach((span)=>{
        span.classList.toggle("hidden");
    })
});

const closeButton = document.getElementById("closeButtonProfile"); 
const profileNav = document.querySelector(".profile-nav");
const profilePicture = document.querySelector(".profile-picture");

closeButton.addEventListener("click", ()=>{
    profileNav.classList.toggle("mini-profile-nav");
    profilePicture.classList.toggle("hidden"); 
});

const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Usuario1', 'Usuario2'],
        datasets: [{
            label: 'Age',
            data: [22, 21],
            borderWidth: 1.5
        }]
    },
    options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
})
