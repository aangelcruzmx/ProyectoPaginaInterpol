//Nombre de los meses y dias

document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["D", "L", "M", "X", "J", "V", "S"];
    //Fecha Actual
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    //seleccion de dias Calendario principal 
    let selectedDay = null;
    
    //seleccion del dia, mes y año del calendario mini
    let miniSelectedDay = null;
    let miniCurrentMonth = today.getMonth();
    let miniCurrentYear = today.getFullYear();

    //elementos del DOM
    const monthSelector = document.getElementById('monthSelector');
    const yearSelector = document.getElementById('yearSelector');
    const calendarDiv = document.getElementById('calendar');
    const miniCalendarDiv = document.getElementById('miniCalendar');
    const miniCalendarHeader = document.getElementById('miniCalendarHeader');
    const miniCalendarEvents = document.getElementById('miniCalendarEvents');
    const eventText = document.getElementById('eventText');

    //Llenar mes y año    
    monthNames.forEach((month, index) => {
        let option = new Option(month, index);
        monthSelector.add(option);
    });
    for (let i = today.getFullYear() - 10; i <= today.getFullYear() + 10; i++) {
        let option = new Option(i, i);
        yearSelector.add(option);
    }
    monthSelector.value = currentMonth;
    yearSelector.value = currentYear;

    ///////EVENTOS////////

    //Cambio de mes
    monthSelector.addEventListener('change', () => {
        currentMonth = parseInt(monthSelector.value);
        generateCalendar(currentMonth, currentYear);
    });
    //cambio de año
    yearSelector.addEventListener('change', () => {
        currentYear = parseInt(yearSelector.value);
        generateCalendar(currentMonth, currentYear);
    });
    //boton de mes anterior
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateSelectors();
        generateCalendar(currentMonth, currentYear);
    });
    //boton de mes siguiente
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateSelectors();
        generateCalendar(currentMonth, currentYear);
    });

    ///GENERACION DE LOS CALENDARIOS
    generateCalendar(currentMonth, currentYear);
    generateMiniCalendar(miniCurrentMonth, miniCurrentYear);


    /**
     *  Agregar Evento
     * controlando la falta de informacion  dentro del dia del evento
     */

    window.addEvent = function() {
        if (!eventText.value.trim()) {
            alert("Por favor, introduce una descripción para el evento.");
            return;
        }

        if (selectedDay) {
            let dateString = selectedDay.dataset.date;
            let events = JSON.parse(localStorage.getItem('events') || '{}');
            if (!events[dateString]) {
                events[dateString] = [];
            }
            events[dateString].push(eventText.value.trim());
            localStorage.setItem('events', JSON.stringify(events));
            eventText.value = '';
            generateCalendar(currentMonth, currentYear);
            generateMiniCalendar(miniCurrentMonth, miniCurrentYear);
        } else {
            alert("Por favor, selecciona un día primero.");
        }
    };


    //Actualizacion de selectores de mes y año
    function updateSelectors() {
        monthSelector.value = currentMonth;
        yearSelector.value = currentYear;
    }

    ///Genera el Calendario Principal
    function generateCalendar(month, year) {
        calendarDiv.innerHTML = '';

        let headerRow = document.createElement('div');
        headerRow.className = 'calendar-header';
        dayNames.forEach(day => {
            let dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.innerHTML = day;
            headerRow.appendChild(dayCell);
        });
        calendarDiv.appendChild(headerRow);

        let firstDay = (new Date(year, month)).getDay();
        let daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('div');
            row.className = 'calendar-row';
            let isEmpty = true;
            for (let j = 0; j < 7; j++) {
                let dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                if (i === 0 && j < firstDay) {
                    dayCell.innerHTML = '';
                } else if (date > daysInMonth) {
                    dayCell.innerHTML = '';
                } else {
                    dayCell.innerHTML = date;
                    dayCell.dataset.date = `${year}-${month + 1}-${date}`;
                    dayCell.addEventListener('click', function() {
                        if (selectedDay) {
                            selectedDay.classList.remove('selected');
                        }
                        selectedDay = this;
                        this.classList.add('selected');
                    });
                    let dateString = dayCell.dataset.date;
                    if (localStorage.getItem('events')) {
                        let events = JSON.parse(localStorage.getItem('events'));
                        if (events[dateString]) {
                            dayCell.classList.add('has-event');
                            dayCell.innerHTML += `<ul class="events-list">` + events[dateString].map(event => `<li>${event}</li>`).join('') + `</ul>`;
                        }
                    }
                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        dayCell.classList.add('today');
                    }
                    date++;
                    isEmpty = false;
                }
                row.appendChild(dayCell);
            }
            if (!isEmpty) {
                calendarDiv.appendChild(row);
            }
        }
    }

    
     //General el Mini Calendario 
    function generateMiniCalendar(month, year) {
        miniCalendarDiv.innerHTML = ''; // Limpiar el contenido del mini calendario
        miniCalendarHeader.innerHTML = `${monthNames[month]} ${year}`; // Actualizar el header con el mes y año

        let headerRow = document.createElement('div');
        headerRow.className = 'mini-calendar-header';
        dayNames.forEach(day => {
            let dayCell = document.createElement('div');
            dayCell.className = 'mini-calendar-day';
            dayCell.innerHTML = day;
            headerRow.appendChild(dayCell);
        });
        miniCalendarDiv.appendChild(miniCalendarHeader); // Asegurarme de agregar el miniCalendarHeader al DOM(Estaba dando fallos)
        miniCalendarDiv.appendChild(headerRow);

        let firstDay = (new Date(year, month)).getDay();
        let daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('div');
            row.className = 'mini-calendar-row';
            let isEmpty = true;
            for (let j = 0; j < 7; j++) {
                let dayCell = document.createElement('div');
                dayCell.className = 'mini-calendar-day';
                if (i === 0 && j < firstDay) {
                    dayCell.innerHTML = '';
                } else if (date > daysInMonth) {
                    dayCell.innerHTML = '';
                } else {
                    dayCell.innerHTML = date;
                    dayCell.dataset.date = `${year}-${month + 1}-${date}`;
                    dayCell.addEventListener('click', function() {
                        if (miniSelectedDay) {
                            miniSelectedDay.classList.remove('selected-mini');
                        }
                        miniSelectedDay = this;
                        this.classList.add('selected-mini');
                        showMiniCalendarEvents(dayCell.dataset.date);
                    });
                    let dateString = dayCell.dataset.date;
                    if (localStorage.getItem('events')) {
                        let events = JSON.parse(localStorage.getItem('events'));
                        if (events[dateString]) {
                            dayCell.classList.add('has-event-mini');
                        }
                    }
                    date++;
                    isEmpty = false;
                }
                row.appendChild(dayCell);
            }
            if (!isEmpty) {
                miniCalendarDiv.appendChild(row);
            }
        }

        //Controles de navegacion para el calendario mini
        let miniControls = document.createElement('div');
        miniControls.className = 'mini-controls';
        let prevMiniMonth = document.createElement('button');
        prevMiniMonth.innerHTML = '←';
        prevMiniMonth.addEventListener('click', () => {
            miniCurrentMonth--;
            if (miniCurrentMonth < 0) {
                miniCurrentMonth = 11;
                miniCurrentYear--;
            }
            generateMiniCalendar(miniCurrentMonth, miniCurrentYear);
        });
        let nextMiniMonth = document.createElement('button');
        nextMiniMonth.innerHTML = '→';
        nextMiniMonth.addEventListener('click', () => {
            miniCurrentMonth++;
            if (miniCurrentMonth > 11) {
                miniCurrentMonth = 0;
                miniCurrentYear++;
            }
            generateMiniCalendar(miniCurrentMonth, miniCurrentYear);
        });
        miniControls.appendChild(prevMiniMonth);
        miniControls.appendChild(nextMiniMonth);
        miniCalendarDiv.appendChild(miniControls);
    }
});
