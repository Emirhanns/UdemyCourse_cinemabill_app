class StorageX{

    static keySelectedSeats = "keySelectedSeats";
    static keyFullSeats = "keyFullSeats"
    static keySelectedMovie = "keySelectedMovie"

    //Listele

    static GetSelectedSeatsFromStorage () {
        let selectedSeats;
        if(localStorage.getItem(this.keySelectedSeats)===null){
            selectedSeats = [];
        }else{
            selectedSeats = JSON.parse(localStorage.getItem(this.keySelectedSeats));
        }
        return selectedSeats;
    }

    
    static GetFullSeatsFromStorage () {
        let FullSeats;
        if(localStorage.getItem(this.keyFullSeats)===null){
            FullSeats = [];
        }else{
            FullSeats = JSON.parse(localStorage.getItem(this.keyFullSeats));
        }
        return FullSeats;
    }

    
    //Ekle

    static addSelectedSeatsToStorage(index){
        localStorage.setItem(this.keySelectedSeats,JSON.stringify(index));
    }

    static addFullSeatsToStorage(index){
        const fullSeatsIndex = this.GetFullSeatsFromStorage();
        index.forEach((indexNumber=>fullSeatsIndex.push(indexNumber)))
        localStorage.setItem(this.keyFullSeats, JSON.stringify(fullSeatsIndex));
    }


    static addSelectedMovieIndexToStorage(index){
        localStorage.setItem(this.keySelectedMovie,JSON.stringify(index))
    }

    static getSelectedMovieIndexFromStorage(){
        return localStorage.getItem(this.keySelectedMovie);
    }
}