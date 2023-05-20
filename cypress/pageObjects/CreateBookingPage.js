import BookingPopup from "./BookingPopup";

const bookingPopup = new BookingPopup();

class CreateBookingPage {
        
    //Header
    getCreateBookingHeader = () => cy.get('div h1');

    //Departure/Arrival station
    getDepartureStationSection = () => cy.get('.box-body.route-wrapper');
    getDepartureStationDropdown = () => cy.get('#select2-departure-container');
    getListDepartureStation = () => cy.get('.select2-results .select2-results__option');
    getArrivalStationDropdown = () => cy.get('#select2-destination-container');
    getArrivalStationList = () => cy.get('.select2-results .select2-results__options');
    getDepartureStationSelectionDropdown = () => cy.get('select[name="departure"]');
    getArrivalStationSelectionDropdown = () => cy.get('select[name="destination"]');
    getArrivalSearchField = () => cy.get('.select2-search__field');
    getLabelDepartureStation = () => cy.get('.departure-wrapper label')
    getDepartureInputSelectSearchField = () => cy.get('.select2-search__field')
    getLabelArrivalStation = () => cy.get('.destination-wrapper label')
    getDepartureStationSelectionArrow = () => cy.get('.departure-wrapper .select2-selection__arrow');
    getDepartureStationDrpdwnComboBox = () => cy.get('.departure-wrapper [class ="select2-selection select2-selection--single"]');
    

    //Departure date
    getDepartureDateSection = () => cy.get('.box-body.calendar-wrapper');
    getDepartureDateLabel = () => cy.get('#label-departure-date');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getCalendarPrevButton = () => cy.get('button.calendar-week-prev');
    getCalendarDays = () => cy.get('.calendar-day-selection-wrapper > .day-wrapper');
    getLabelCalendar = () => cy.get('div #calendar-week');
    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('select[name="calendar_month"] option');
    getMonthDropdownSelect = () => cy.get('select[name="calendar_month"]');
    getFridayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(5)');
    getWeekButton = () => cy.get('button.calendar-view-week');
    getSaturdayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(6)');
    getLableDepartureDate = () => cy.get('#label-departure-date');
    getDepartureDate = () => cy.get('.popup-trip div:nth-child(5) span');
    getDaySelected = () => cy.get('[class="day-wrapper selected"]');
    getMondayButton = () => cy.get('div .calendar-day-selection-wrapper :first-child');
    getOctoberMondayButton = () => cy.get('.calendar-day-selection-wrapper > :nth-child(8)');

    //Departure on
    getDepartureOnSection = () => cy.get('.box-body.trips-wrapper');
    getDepartureOnLabel = () => cy.get('.trips-filters-wrapper #label-departure-on');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getSecondTripCard = () => cy.get('div .trip:nth-child(2)');
    getTicketsAvailableFirstTripCard = () => cy.get('.trip:first-child span.availability span.num');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getNumberAllSeatsFirstTripCard = () => cy.get('div .trip:first-child .class');
    getNumberSeatsAvailableTripCard = () => cy.get('div.trip span.num');
    getPriceOfTicket = () => cy.get('.vehclass-ferry.selected .price');
    getLabelTicketsAvailableSecondTripCard = () => cy.get('.trip:nth-child(2) span.availability');
    getDepartureTime = () => cy.get('.popup-trip div:nth-child(6) span');
    getDepartureLatestButton = () => cy.get('button.trips-order-desc');
    getDepartureTripCardsList = () => cy.get('.trips-list-wrapper > div.trip');
    getBtnErliest = () => cy.get('button.trips-order-asc');
    getTripClassDropdown = () => cy.get('select[name="trips_class"]');
    getVehicleClassTripCards = () => cy.get('.trips-list-wrapper > div> span.class');
    getNumberTicketsAvailableSecondTripCard = () => cy.get('.trip:nth-child(2) span.availability .num');
    getClassUnselectedTripCards = () => cy.get('.trips-list-wrapper > div.trip .class');
    getSelectedTripCard = () => cy.get('div.trip.selected');
    getSecondTripCardAvailability = () => cy.get('div .trip:nth-child(2) span.availability');
    getTimeOfDepartureSelectedTripCard = () => cy.get('.trip.selected span[class="departure"]');
    getBookedTripCard = () => cy.get('div.trips-list-wrapper div.trip.booked');
    getVehicleClassSelectedTripCard = () => cy.get('.trip.selected span[class="class"]');
    getStatusTripCard = () => cy.get('.trips-list-wrapper .booked .price');
    getTicketsAvailabilityTripCard = () => cy.get('.trip:first-child span.availability');
    getAvailabilityTripStatus = () => cy.get('span.availability')
    getTripsPrice = () => cy.get('.trip span.price')

    //Arrival on
    getArrivalTime = () => cy.get('.popup-trip div:nth-child(7) span');
    getArrivalTimeLabel = () => cy.get('.popup-trip div:nth-child(7) label');
    
    //Passengers details
    getPassengerNamesInputs = () => cy.get('.form-control[name="passenger-name[]"]');
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]:first-child');
    getExtraPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]:not(.form-control:first-child)')
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getPassengersDetailsDropdown = () => cy.get('.passenger-wrapper .title select.passengers-amount');
    getPassengersDetailsDropdownList = () => cy.get('.passenger-wrapper .title select.passengers-amount option');
    getPhoneNumberInputFild = () => cy.get('input#passenger-phone');
    getFareTypeSelects = () => cy.get('[name="passenger-fare[]"]');
    getFareTypeDropdown = () => cy.get('[id^="select2-passenger-fare"]');
    getFareTypeLabel = () => cy.get('.div-fare-type > label');
    getMainPassengerFareTypeDropdownSelect = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select');
    getMainPassengerFareTypeDropdownList = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select option');
    getAddedPassengersFareTypeDropdownLists = () => cy.get('div.passenger-row.passenger-add .div-fare-type select');
    getAddedPassengerFareTypeDropdownListOptions = () => cy.get('[class="select2-results__options"] li');
    getEmailInputField = () => cy.get('.form-control[name="passenger-email"]');
    getAmountOfChosenPass = () => cy.get('.box-default .passenger-wrapper .passenger-row');
    getLabelMainPassenger = () => cy.get('div.passenger-row > label');
    getPlaceholderPassengerName = () => cy.get('input[placeholder="Passenger name"]')
    getPlaceholderPhoneNumber = () => cy.get('[placeholder="Phone number"]')
    getMainPassengerSelectedSeatByDefault = () => cy.get('div[class="col-lg-12 passenger-row"] span[class="seat-number"]')
    getPassengerDetailsAssignedSeats = () => cy.get('span.seat-number')
    getSelectedDialCode = () => cy.get('.iti__selected-dial-code');
    getAllCountryCodes = () => cy.get('.iti__country-name');
    getNotesInputField = () => cy.get('textarea#booking_notes');
    getDialCodeArrow = () => cy.get('.iti__selected-flag');    
    getExtraFareTypeData = () => cy.get('.fare-type-box .form-control');
    getExtraFareTypeDrop = () => cy.get('.fare-type-box .select2-selection__rendered');
    getDropdownPassengerDefault = () => cy.get('.passenger-wrapper option[value="1"]');
    getRemovePassengerBtns = () => cy.get('.passenger-row .btn-remove-passenger');
    getNotesRemarkLabel = () => cy.get('.notes-row > label');
    getSelectionArrowFareType = () => cy.get('.div-fare-type .select2-selection__arrow')

    // Trip section
    getTrips = () => cy.get('div.trip');

    //Seat selection
    getSeatSelectionDropdown = () => cy.get('.layout-wrapper .title select.passengers-amount');
    getSeatSelectionDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getSelectedSeats = () => cy.get('table.seats tr td[class="seat selected"]');
    getRowsSeatsSeatSection = () => cy.get('.seat-chart .seats tr:not(tr:first-child)');
    getDriverSeat = () => cy.get('table.seats tr td[class="seat blocked"]');
    getAllSeatsSeatSelection = () => cy.get('.seat-chart .seats td');
    getTitleOfSeatsTable = () => cy.get('.seats tbody th');
    getSeatInRow = () => cy.get('.seat-chart .seats tr:nth-child(2) td');
    getAvailableSeatsSeatSelection = () => cy.get('.seat-chart .seats td:not(.unavailable)');
    getLabelSeatSelection = () => cy.get('div.layout-wrapper div.title label');
    getSelectSeatLableTrip = () => cy.get('.seats [colspan]')

    // Summary section 
    getSeatsNumberColumnSummary = () => cy.get('.total-wrapper > div.total-row :nth-child(3)');
    getRowsSummary = () => cy.get('.total-wrapper > div.total-row');
    getAmountOfPassengersInSummary = () => cy.get('.box-default .total-wrapper  .total-row');
    getPricesSummary = () => cy.get('.total-wrapper > div.total-row span');
    getTotalPriceSummary = () => cy.get('.box-footer span.total-price.right');
    getTotalSummaryLabel = () => cy.get('div.box-footer > span:nth-child(1) > b');
    getFareTypeColumnSummary = () => cy.get('div.total-row > div:nth-child(1)');
    getSummarySection = () => cy.get('.summary-box .col-lg-12')

    //Total - Footer section                  
    getReservationTicketArrow = () => cy.get('.btn-group .caret');
    getReservationTicketButton = () => cy.get('.btn-reserve-tickets');
    getTotalPrice = () => cy.get('.footer-book-wrapper span.total-price')
    getTotalPriceLabel = () => cy.get('.footer-book-wrapper > :first-child');
    getBookTicketsButton = () => cy.get('[class="btn btn-book"]');
    getResetButton = () => cy.get('[class="btn btn-reset-form"]');
    getDropdownToggleButton = () => cy.get('[class="btn btn-book dropdown-toggle"]');

    // Credit Balance
    getBalanceAmountOnBookingPage = () => cy.get("span#agent-balance");
    getBalanceOnBookingPage = () => cy.get("h1 .agent-balance-wrap");
    getSpinner = () => cy.get("#agent-balance .fa");

    // Methods
    createBooking(passengerNames, passengerAmount, fareTypes) {
        this.clickCalendarNextButton()
    
        this.clickFridayButton()

        this.selectAmountPassengersDetailsDropdown(passengerAmount)

        this.clickTripCard()

        this.getLabelSeatSelection()
                    .should('be.visible')
                    .and('have.text', 'Seat selection')
    
        this.typePassengerNames(passengerNames)
    
        this.selectFareTypes(fareTypes)

        this.clickBookTicketsBtn()
    }

    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickCalendarPrevButton() {
        this.getCalendarPrevButton().click()
    };

    clickTripCard() {
        cy.intercept('/tools/**').as('getTrip');
        cy.wait('@getTrip');

        this.getTrips().each(($el) => {
            const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
                return false;
            }
        })
    };

    clickFirstTripCard() {
        cy.wait(300)
        this.getFirstTripCard().click({ force: true })
    };

    clickSecondTripCard() {
        cy.wait(1500)
        cy.intercept('/tools/**').as('getTrip');
        cy.intercept('POST', '/booking/**').as('getBooking');
        cy.wait('@getTrip');

        this.getSecondTripCardAvailability().then(($el) => {
            if ($el.text() == "Overdue") {
                this.clickCalendarNextButton();
                cy.wait('@getBooking'); 
                this.getSecondTripCard().click();
                return false;
            } else {
                this.getSecondTripCard().click();
                return false;
            }           
        }) 
     }

    typePassengerNames = (names) => {
        this
            .getPassengerNamesInputs()
            .each((inputName, index) => {
                if (Array.isArray(names)) {
                    cy.wrap(inputName).type(names[index])
                } else {
                    cy.wrap(inputName).type(names)
                }
            })
    }

    typeIntoMainPassengerNameField(name) {
        this.getMainPassengerNameField().type(name)
    };

    typeIntoMainPassengerPhoneField(phone) {
        this.getMainPassengerPhoneField().type(phone)
    };

    typeIntoMainPassengerEmailField(Email) {
        this.getEmailInputField().type(Email)
    };

    typeNotesInputField(notes) {
        this.getNotesInputField().type(notes)
    }

    clickMonthBtn() {
        this.getMonthBtn().click({ force: true })
    }

    clickFridayButton() {
        this.getFridayButton().click();
    }

    clickDepartureStationDropdown() {
        this.getDepartureStationDropdown().click()
    };

    clickDepartureStationSelectionArrow() {
        this.getDepartureStationSelectionArrow().click()
    };

    clickArrivalStationDropdown() {
        this.getArrivalStationDropdown().click()
    };

    clickFareTypeDropdown() {
        this.getFareTypeDropdown().click()
    };

    clickSaturdayButton() {
        this.getSaturdayButton().click();
    };

    clickReservationTicketArrow() {
        this.getReservationTicketArrow().click()
    };

    clickReservationTicketButton() {
        this.getReservationTicketButton().click({ force: true })        
    };

    clickDepartureLatestButton() {
        this.getDepartureLatestButton().click({ force: true })
    };

    clickDepartureErliestButton() {
        this.getBtnErliest().click({ force: true })
    };

    clickResetButton() {
        this.getResetButton().click()
    };

    getRandomIndexOfMonth() {

        return this.getMonthDropdownList().then($el => {
            let arrayOfMonth = $el.toArray().map(el => el.innerText);
            let indexOfMonth = Math.floor(Math.random() * arrayOfMonth.length);
            if (indexOfMonth == 0) {
                indexOfMonth++;
            }
            return indexOfMonth;
        });
    };

    selectDepartureStation(stationName) {
        this
            .clickDepartureStationDropdown()
        this
            .getListDepartureStation()
            .contains(stationName)
            .click()
    }

    selectArrivalStation(stationName) {
        this
            .clickArrivalStationDropdown()
        this
            .getArrivalStationList()
            .contains(stationName)
            .click()
    }

    selectNeedDepartureStation(nameStation) {
        this.getCreateBookingHeader().click()
        this.clickDepartureStationDropdown()
        this.getListDepartureStation().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).click({ force: true })
            }
        })
    };

    hoverNeedDepartureStation(nameStation) {
        this.getCreateBookingHeader().click({ force: true })
        this.clickDepartureStationDropdown()
        this.getListDepartureStation().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).trigger('mouseover')
            }
        })
    };

    selectMonthFromMonthDropdown(month) {
        this.getMonthDropdownSelect().select(month, { force: true })
    }

    getRandomAmountOfPassSeatSelectionDrpDwn() {

        return this.getSeatSelectionDropdownList().then($el => {
            let passengersArray = $el
                .toArray()
                .map(el => el.innerText)

            let indexArr = Math.floor(Math.random() * passengersArray.length)
            let amountOfPass = passengersArray[indexArr]

            return amountOfPass;
        })
    }

    clickWeekBtn() {
        this.getWeekButton().click();
    }

    clickBookTicketsBtn() {
        this.getBookTicketsButton().click({ force: true });
    }

    getFirstAvailableForBookingDefaultDay() {                   
        let date = new Date();
        date.setDate(date.getDate() + 2);
        let requiredDate = date.toLocaleString("en-US", { day: 'numeric',  timeZone: 'Asia/Bangkok'});
        return requiredDate;
    }

    getCurrentMonthAndYear() {
        let date = new Date();
        const currentMonthAndYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return currentMonthAndYear;
    }
 
    getFirstAvailableForBookingDefaultMonthYear() {
        let date = new Date();
        date.setDate(date.getDate() + 2);
        let requiredMonthYear = date.toLocaleString("en-US", { month: 'short', year: 'numeric',  timeZone: 'Asia/Bangkok'});
        return requiredMonthYear;
    }

    selectAmountPassengersDetailsDropdown(amount) {
        this.getPassengersDetailsDropdown().select(`${amount}`)
    }

    clickCalendarDay(customDay) {
        this.getCalendarDays().not('.unavailable').each(($el) => {
            if ($el.text() === customDay) {
                cy.wrap($el).click({force: true})
                return false
            } 
        })    
    }

    getNextMonth(date) {
        let getNextMonth = date.getMonth() + 1;
        const nextMonth = date.setMonth(getNextMonth);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return formattedDate;   
    }

    getFirstAvailableForBookingDefaultDayMonthYear() {             
        let defaultDayMonthYear = this.getFirstAvailableForBookingDefaultDay() + " " + this.getFirstAvailableForBookingDefaultMonthYear();
        return defaultDayMonthYear;       
    }

    getPreviousMonth(date) {
        let prevMonth = date.getMonth() - 1;
        date.setMonth(prevMonth);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return formattedDate;
    }

   /**
   *
   * this function returns the date as a string of the Monday of the current week
   */
  getCurrentMonday() {
    const currentDate = new Date();
    const currentMonday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 1
    );
    const currentMondayDate = currentMonday.toDateString();
    const currentMondayDayOnlyNumber = currentMondayDate.split(" ")[2];
    return currentMondayDayOnlyNumber;
    }
    
    getCurrentDate() {
        const date = new Date();
        const currentDate = date.toLocaleDateString('en-US', { day: 'numeric' });
        return currentDate
    }

    getCurrentDateInThailand() {
        const date = new Date();
        let currentDateThailand = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'Asia/Bangkok' })
        return currentDateThailand
    }
    
   clickBalanceOnBookingPage() {
    this.getBalanceOnBookingPage().click();
   }

   clickRemovePassengerBtn(passengerNumber) {
    this.getRemovePassengerBtns().eq(passengerNumber - 1).click()
    }
    
    clickOnLastAvailiableTripCard() {
        cy.wait(1500)
        this.getDepartureTripCardsList().each(($el) => {
        const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
            }
        })
       
    }

    clickOnFirstAvailableTripCard() {
        cy.wait(1500)
        this.getDepartureTripCardsList().each(($el) => {
            const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
                return false;
            }
        })
    }

    /**
     * @clicks on the first avaliable for booking (if any) trip card for the default selected day, or on the first avaliable trip card on the next day 
     * if next day falls on the next week - on the first avaliable trip card on Wednesday, next week 
     * @param {*'@getLayout', *'@getTrip'} are called within file
     *  cy.intercept('POST', '/booking/', (req) => {
	 *	if (req.body.includes('action=get-trips')) {
	 *		req.alias = 'getTrip'
	 *	}
     * })
     * cy.intercept('POST', '/booking/?get-layout').as('getLayout')
     */
    clickOnAvailableTripCard() {
        cy.wait(1500)
        this.getDepartureTripCardsList().filter(':visible').then(($el) => {
            if ($el.text().includes('tickets available')) {
                this.getDepartureTripCardsList().filter(':visible').filter(':contains("tickets available")').first().click()
                cy.wait('@getLayout')
                } else {
                    this.getDaySelected().invoke('index').then((i) => {
                        let ind = i 
                        if (ind + 1 <= 6) {
                            this.getCalendarDays().eq(ind + 1).click()
                            cy.wait('@getTrip')
                            cy.wait(1200)
                            this.getDepartureTripCardsList().filter(':visible').filter(':contains("tickets available")').first().click()
                            cy.wait('@getLayout')
                        } else {
                            this.clickCalendarNextButton()
                            cy.wait('@getTrip')
                            this.getCalendarDays().eq(2).click()
                            cy.wait('@getTrip')
                            cy.wait(1200)
                            this.getFirstTripCard().filter(':visible').click({ force: true })
                            cy.wait('@getLayout')
                        }
                    })
                }
            })
    } 
    /**
     * the precondition of this method is a click on an available trip
     */
    reserveAvailableTrip(passengerAmount, passengerNames, fareTypes) {
        this.selectAmountPassengersDetailsDropdown(passengerAmount);
        this.typePassengerNames(passengerNames);  
        this.selectFareTypes(fareTypes);
        this.clickReservationTicketArrow();
        this.clickReservationTicketButton();
    }

    /**
     * pass needed fareType in a function ('Adult, Child, Elder) to select option in dropdown
     * @param {*} fareType 
     */
    selectFareTypes(fareType) {
        this
            .getFareTypeSelects()
            .each((select, index) => {
                if (Array.isArray(fareType)) {
                    cy.wrap(select).select(fareType[index], { force: true })
                } else {
                    cy.wrap(select).select(fareType, { force: true })
                } 
            })
    }

    selectFareType(fareType) {
        this.getAddedPassengerFareTypeDropdownListOptions().each(function ($el) {
            if ($el.text() === fareType) {
               return cy.wrap($el).click()
            }
        })
    };

    /**
     * fills out all displayed name inputs with default names
     * @returns 'Passenger ' + index
     */
    completeMultipleNameFields() {
        return this.getMainPassengerNameField().each(($el, index) => {
            cy.wrap($el).type('Passenger ' + index)
        })
    }

    selectCountryPhoneCode(country) {
        this.getSelectedDialCode().click()
        this.getAllCountryCodes().each($el => {
            if ($el.text() == country) {
                cy.wrap($el).click()
            }
        })
    }

    selectFareTypeMainPassenger(FareType) {
        this.getMainPassengerFareTypeDropdownSelect().each($el => {
            cy.wrap($el).select(FareType, { force: true })         
        })
    }

    selectNeedArrivalStation(nameStation) {
        this.getCreateBookingHeader().click()
        this.clickArrivalStationDropdown()
        this.getArrivalStationList().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).click({ force: true })
            }
        })
    }

    hoverNeedArrivalStation(nameStation) {
        this.getCreateBookingHeader().click({ force: true })
        this.clickArrivalStationDropdown()
        this.getArrivalStationList().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).trigger('mouseover')
            }
        })
    }      

    /**
      * @returns array of 13 consetutive months, starting from current
    */
    createArrayOfConsetutiveMonths = () => {
        let consecutiveMonths = []
        let count = 0
        while (count <= 12) {
            const current = new Date()
            current.setDate(1)
            current.setMonth(current.getMonth() + count)
            const month = current.toLocaleString('en-US', { month: 'short', year: 'numeric' })
            consecutiveMonths.push(month)
            count++
        }
        return consecutiveMonths
    }  

    /**
      * @returns array of 3 months in order: current, six months from current, 12 months from current 
    */
    validBoundaryValuesMonthDropdownMinNomMax () {
        return [this.createArrayOfConsetutiveMonths()[0], this.createArrayOfConsetutiveMonths()[6], this.createArrayOfConsetutiveMonths()[12]]
    }

    getNextMonthAndCurrentYear() {
        const date = new Date();
        date.setDate(1)
        date.setMonth(date.getMonth() + 1);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' });
        return formattedDate;
    }

    getCurrentMonthAndYearThailand() {
        let date = new Date();
        const currentMonthAndYearThailand = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' });
        return currentMonthAndYearThailand;
    }
  
    /**
        * @param {*'@getTrip' } is called within file
        *  cy.intercept('POST', '/booking/', (req) => {
        *	if (req.body.includes('action=get-trips')) {
        *		req.alias = 'getTrip'
        *	}
        * })
    */
    createCustomBooking({departureStationName, arrivalStationName, passengerName, passengerAmount, fareType}) {
        if (departureStationName !== 'Ao Por Pier' && arrivalStationName !== 'Naka Island'){
            this.selectDepartureStation(departureStationName)
            cy.wait('@getTrip')
            this.selectArrivalStation(arrivalStationName)

            if (departureStationName === 'Bangkok Khao San' && arrivalStationName === 'Chonburi') {
                this.clickCalendarNextButton()
                cy.wait('@getTrip')
                this.clickSaturdayButton()
            } else {
                this.clickCalendarNextButton()
                cy.wait('@getTrip')
                this.clickFridayButton()
            }
            cy.wait('@getTrip')
        } else {
            this.clickCalendarNextButton()
            cy.wait('@getTrip')
            this.clickFridayButton()
            cy.wait('@getTrip')
        }   
        this.selectAmountPassengersDetailsDropdown(passengerAmount)

        cy.wait(1500);
        this.getTrips().each(($el) => {
            if ($el.text().includes('tickets available')) {
                cy.wrap($el).click();
                return false;
            }
        })
        this.getLabelSeatSelection()
                .should('be.visible')
                .and('have.text', 'Seat selection')
        
        this.typePassengerNames(passengerName)
    
        this.selectFareTypes(fareType)
        
        this.clickBookTicketsBtn()
    }	

    clickgetOctoberMondayButton() {
        this.getOctoberMondayButton().click({ force: true })
    }

    /** 
    * @returns boolean, checks if each three consecutive elements in array have same number with letters "A","B","C"
    */
    isSameRowSeatsA_B_C = (array) => {
        let check = true
        let expectedString = "ABC"
        for (let i = 0; i < array.length; i += 3) {
            let checkForA_B_C = array.slice(i, i + 3).map(el => el.replace(/^\d/g, '')).join("")
            let checkForSameNumber = new Set(array.slice(i, i + 3).map(el => parseInt(el)))
            check = check && (checkForSameNumber.size == 1) && (checkForA_B_C == expectedString)
        }
        return check
    }    

    reserveBooking(passengerNames, passengerAmount, fareTypes) {
        this.clickCalendarNextButton();
    
        this.clickFridayButton();

        this.selectAmountPassengersDetailsDropdown(passengerAmount);

        this.clickTripCard();        
    
        this.typePassengerNames(passengerNames);
    
        this.selectFareTypes(fareTypes);

        this.clickReservationTicketArrow();

        this.clickReservationTicketButton();
    }    

    getValidBoundaryValuesMonthDropdownMinNomMax() {
        let validBoundaryValueArrayMinNomMax = this.validBoundaryValuesMonthDropdownMinNomMax()
        if (this.getFirstAvailableForBookingDefaultDay() === "1" || this.getFirstAvailableForBookingDefaultDay() === "2") {
            this.clickCalendarPrevButton()
        }
        return validBoundaryValueArrayMinNomMax
    }

    getPreviousWeekMonSundDays = (date) => {
        let now = new Date()
        const currentYear = now.toLocaleString('en-US', { year: 'numeric' });
        const nextWeekMonday = new Date(date + " " + currentYear)
        nextWeekMonday.setDate(nextWeekMonday.getDate() - 7)
        let previousWeekMonday = nextWeekMonday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ")
        previousWeekMonday = previousWeekMonday[1] + " " + previousWeekMonday[0]

        nextWeekMonday.setDate(nextWeekMonday.getDate() + 6)
        let previousWeekSunday = nextWeekMonday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ")
        previousWeekSunday = previousWeekSunday[1] + " " + previousWeekSunday[0]
        return previousWeekMonday + ' - ' + previousWeekSunday
    }

    reserveSecondTripDefaultDay(passengerAmount, passengerNames, fareTypes) {
        this.clickSecondTripCard(); 
        this.selectAmountPassengersDetailsDropdown(passengerAmount);
        this.typePassengerNames(passengerNames);  
        this.selectFareTypes(fareTypes);
        this.clickReservationTicketArrow();
        this.clickReservationTicketButton();
        bookingPopup.getBookingPopupWindow().should('be.visible');        
    }

    /**
      * @returns number of days in months
    */
    getNumberOfDaysInMonth = (month, year) => {
        let monthIndex = [
            'Jan', 'Feb', 'Mar',
            'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec',
        ].indexOf(month)

        return new Date(year, monthIndex + 1, 0).getDate();
    }

    /**
      * @returns month from given in format "Mar 2023" date, ex 'Mar'
    */
    getMonthOnly(date) {
        return date.split(' ')[0]
    }
    /**
    * @returns year from given in format "Mar 2023" date, ex. '2023'
    */
    getYearOnly(date) {
        return date.split(' ')[1]
    }
    
    chooseDate() {
        let date
        let numberOfDaysInCurrentMonth = this.getNumberOfDaysInMonth(this.getMonthOnly(this.getCurrentMonthAndYearThailand()), this.getYearOnly(this.getCurrentMonthAndYearThailand()))
        let arrayOfDates = [this.getCurrentDateInThailand()]
        for (let i = 1; i < this.validBoundaryValuesMonthDropdownMinNomMax().length; i++) {
            let numberOfDays = this.getNumberOfDaysInMonth(this.getMonthOnly(this.validBoundaryValuesMonthDropdownMinNomMax()[i]), this.getYearOnly(this.validBoundaryValuesMonthDropdownMinNomMax()[i]))
            if (numberOfDays < numberOfDaysInCurrentMonth && +this.getCurrentDateInThailand() == numberOfDaysInCurrentMonth) {
                date = (+this.getCurrentDateInThailand() - 1).toString()
                arrayOfDates.push(date)
            } 
            else if (this.validBoundaryValuesMonthDropdownMinNomMax()[i].includes('Feb') && numberOfDaysInCurrentMonth == 31 && +this.getCurrentDateInThailand() == numberOfDaysInCurrentMonth) {
                date = (+this.getCurrentDateInThailand() - 2).toString()
                arrayOfDates.push(date)
            }
            else {
                arrayOfDates.push(this.getCurrentDateInThailand())
            } 
        }
        return arrayOfDates
    }

    chooseBookingInfoAndBookTickets(passengerNames, passengerAmount, fareTypes) {
        this.selectAmountPassengersDetailsDropdown(passengerAmount)
        this.typePassengerNames(passengerNames)
        this.selectFareTypes(fareTypes)
        this.clickBookTicketsBtn()
    }

    getTimeOfDepartureSelectedTripCardText() {
        return this.getTimeOfDepartureSelectedTripCard().then(($time) => {
            const timeOfDeparture = $time.text()
            return timeOfDeparture
        })
    }

    /**
    * @returns DepartureOnDate from given in format "14-04-2023"
    */
    getLabelDepartureOnDateText() {
        return this.getLabelDepartureOnDate().then(($date) => {
            const departureOnDate = $date.text()
            let now = new Date(departureOnDate)
            let formatDepartureOnDate = now.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
            return formatDepartureOnDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')
        })
    }

    /**
    * @returns VehicleClass without digits ("Ferry", "VIP bus", "Economy bus")
    */
    getVehicleClassSelectedTripCardText() {
        return this.getVehicleClassSelectedTripCard().then(($vehicle) => {
            const vehicleClass = $vehicle.text().replace(/([0-9])+/i, "").trimEnd()
            return vehicleClass
        })
    }

    getPassengerSeatNumberText() {
        return this.getPassengerDetailsAssignedSeats().then(($seat) => {
            const seatNumber = $seat.text()
            return seatNumber
        })
    }

    /**
     * If trip card don't have status Inactive press Next 
     */
    isAllTripOverdueClickNext(inactiveStatus) {
        this.getAvailabilityTripStatus().then(($status) => { 
            if ($status.text().includes(inactiveStatus)) {
                return false;
            } else {
                this.clickCalendarNextButton()
            }
         })
    }
}
export default CreateBookingPage;
