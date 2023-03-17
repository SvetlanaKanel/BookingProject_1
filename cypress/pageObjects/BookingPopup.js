class BookingPopup {
    //Elements
    getConfirmTicketButton = () => cy.get('.btn-confirm-ticket'); 
    getPassengerTitle = () => cy.get('.popup-passengers h3');
    getOnePassengerTypeLabel = () => cy.get('div.passenger-info div:first-child label');
    getPassengersList = () => cy.get('.popup .passengers-box .passenger-info');
    getCloseBtnBookingPopup = () => cy.get('.close-button');
    getBookingID = () => cy.get('.booking-id .booking-tracker');
    getPassengerTypeLabel = (labelTypeNumber) => cy.get(`.passengers-box > :nth-child(${labelTypeNumber}) > :nth-child(1) > label`)
    getBookingPopupWindow = () => cy.get('.popup-content');
    getBtnExtend = () => cy.get('#button-extend');
    getCountdownClock = () => cy.get('#countdown-clock');
    getNotesRemarkField = () => cy.get('.popup-booking div:last-child>span');
    getChannelField = () => cy.get('.channel');

    // Booking Details
    getBookingDetailsTitle = () => cy.get('.popup-booking > h3')

    //Passenger prices section

    getFirstFareType = () => cy.get('.passengers-prices div:nth-child(1) label');
    getSecondFareType = () => cy.get('.passengers-prices div:nth-child(2) label');
    getThirdFareType = () => cy.get('.passengers-prices div:nth-child(3) label');

    // methods
    clickCloseBtnBookingPopup() {
        this.getCloseBtnBookingPopup().click()
    }

    clickBtnExtend() {
        this.getBtnExtend().click();
    }

    getTimeFromTimer() {        
        return this.getCountdownClock().then($el => {
            let extendTimeArray = $el.text().split(":"); 
            let extendTimeStr = extendTimeArray[1].trim() + "." + extendTimeArray[2].trim();
            let extendTimeNumber = parseFloat(extendTimeStr);
            return extendTimeNumber;       
        })     
    }

     /**
     * this method returns string "DD-MM-YYYY hh:mm:"
     */
     getCurrentDateAndTimeInTailand() {
        let date = new Date();
       
        const currentDateTime = date.toLocaleString("en-US", { currentTime: 'numeric',  timeZone: 'Asia/Bangkok'});
        let dateTimeArray = currentDateTime.split(',');
        let currentDateArrey = dateTimeArray[0].split('/');
        let curentMonth;
        if (currentDateArrey[0] < 10) {
            curentMonth = ('0' + currentDateArrey[0]).split(' ').join('')
        } else {
            curentMonth = currentDateArrey[0];
        }
        let formattedDate = currentDateArrey[1] + '-' + curentMonth + '-' + currentDateArrey[2]
        let currentTimeArray = dateTimeArray[1].split(':');
        let hour ;
        if (currentTimeArray[0] < 10) {
            hour = ('0' + currentTimeArray[0]).split(' ').join('');
        } else {
            hour = currentTimeArray[0];
        }
        let formattedTime = hour + ":" + currentTimeArray[1] + ":";
        let formattedDateAndTime = formattedDate + " " + formattedTime;
        
        return formattedDateAndTime;
    }
}
export default BookingPopup;