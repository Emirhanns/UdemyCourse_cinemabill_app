// Element seçimi

const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton")

runEventListeners();

function runEventListeners() {
    container.addEventListener("click", select);
    selectMovie.addEventListener("change", saveSelectedMovieIndexToStorage)
    document.addEventListener("DOMContentLoaded", runPageLoaded)
    buyButton.addEventListener("click", buyTicket)
}

function changeSomething() {
    calculate();
    saveSelectedMovieIndexToStorage();
}

function select(e) {
    const selectedElement = e.target.parentElement;
    if (selectedElement.classList.contains("seat") && !selectedElement.classList.contains("full")) {
        selectedElement.classList.toggle("selected");
        calculate();
        saveSelectedSeatsIndexToStorage();
        saveSelectedMovieIndexToStorage();


    }

}


function GetSelectedSeats() {
    const selectedSeat = [...container.querySelectorAll(".selected")]; //Array.from(container.querySelectorAll(".selected"));
    return selectedSeat;
}

function GetSelectedSeatsIndex() {
    const selectedList = GetSelectedSeats();
    const selectedSeatsIndex = selectedList.map((seat) => {
        return seats.indexOf(seat);
    }
    )
    return selectedSeatsIndex;

}

function calculate() {

    const selectedSeatCount = GetSelectedSeats().length;
    const moviePrice = selectMovie.value;  //selectMovie.options[selectMovie.selectedIndex].value;


    count.textContent = selectedSeatCount;
    amount.textContent = selectedSeatCount * moviePrice;


}

function saveSelectedSeatsIndexToStorage() {
    const selectedSeatsIndex = GetSelectedSeatsIndex();
    StorageX.addSelectedSeatsToStorage(selectedSeatsIndex)

}

function runPageLoaded() {
    const selectedSeatsIndex = StorageX.GetSelectedSeatsFromStorage();
    const FullSeatsIndex = StorageX.GetFullSeatsFromStorage();

    seats.forEach((seat, index) => {
        if (selectedSeatsIndex.includes(index)) {
            seat.classList.add("selected")
        }
    })

    seats.forEach((seat,index)=>{
        if(FullSeatsIndex.includes(index)){
            seat.classList.add("full")
        }
    })

    selectMovie.selectedIndex = StorageX.getSelectedMovieIndexFromStorage();
    calculate();
}

function saveSelectedMovieIndexToStorage() {
    const selectedMovieIndex = selectMovie.selectedIndex;
    StorageX.addSelectedMovieIndexToStorage(selectedMovieIndex);
    calculate();


}

function buyTicket() {
    if (confirm("Satın almak istiyor musunuz?")) {
            const selectedSeats = GetSelectedSeats();
            const selectedSeatsIndex = GetSelectedSeatsIndex();
            selectedSeats.forEach(seat=>{
                seat.classList.remove("selected");
                seat.classList.add("full");});

            StorageX.addFullSeatsToStorage(selectedSeatsIndex);
            StorageX.addSelectedSeatsToStorage(GetSelectedSeatsIndex())
            

        }
}