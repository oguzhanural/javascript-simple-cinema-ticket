
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener("click",function(e){
    
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {   
        //console.log(e.target);
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});

function calculateTotal(){
        const selectedSeats = container.querySelectorAll('.seat.selected');
        // console.log(seats);
        // console.log(selectedSeats);
        const selectedSeatsArr = [];
        const seatsArr = [];

        selectedSeats.forEach(seat => selectedSeatsArr.push(seat)); 
        seats.forEach(function(seat){
            seatsArr.push(seat);
        });

        let selectedSeatIndex = selectedSeatsArr.map(function(seat){
            return seatsArr.indexOf(seat);
        });

        

        var selectedSeatCount = selectedSeats.length;
        //console.log(selectedSeatCount);
        //console.log(select.value);
        count.innerText = selectedSeatCount;
        amount.innerText = select.value * selectedSeatCount + " TL";
        saveToLocalStorage(selectedSeatIndex);
}
function getFromLocalStorage(){
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

   if(selectedSeats != null && selectedSeats.length > 0 ){
    seats.forEach(function(seat,index){
        if(selectedSeats.indexOf(index) > -1){
            seat.classList.add('selected');
        }
    });
   }
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

   if(selectedMovieIndex != null){
    select.selectedIndex = selectedMovieIndex;

   }
}

function saveToLocalStorage(indexNums){
    localStorage.setItem('selectedSeats',JSON.stringify(indexNums));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex); // selectedIndex bir property'dir. https://www.w3schools.com/jsref/prop_select_selectedindex.asp
}




