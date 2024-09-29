const months = [
    { 
        name: 'SEPTEMBER', 
        days: 30,
        events: [
            { 
                date: 9, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            },
            { 
                date: 18, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            },
            { 
                date: 23, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            }
            
        ] 
    },
    { 
        name: 'OCTOBER',
        days: 31,
        events: [
            { 
                date: 2, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: 'Hart House', 
                room: '2005' 
            },
            { 
                date: 7, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: 'Bahen', 
                room: '2155' 
            },
            { 
                date: 16, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: 'Bahen', 
                room: '2185' 
            },
            { 
                date: 21, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            },
            { 
                date: 30, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            }

        ]
     },
    { 
        name: 'NOVEMBER',
        days: 30,
        events: [
            { 
                date: 4, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            },
            { 
                date: 13, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            },
            { 
                date: 18, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: 'Hart House', 
                room: '2005' 
            },
            { 
                date: 27, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: '', 
                room: '' 
            }
        ]
     },
    { 
        name: 'DECEMBER',
        days: 31,
        events: [
            { 
                date: 2, 
                startTime: '6:00 PM', 
                endTime: '8:00 PM', 
                zoomLink: 'https://utoronto.zoom.us/j/3336661729', 
                location: 'Hart House', 
                room: '2005' 
            }
        ]
    },
];

let currentMonthIndex = 0;

function renderCalendar(monthIndex) {
    const calendar = document.getElementById('calendar');
    const month = months[monthIndex];
    const year = 2024; 
    
    let html = `
        <h2>${month.name} ${year}</h2>
        <table>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
    `;


    const firstDay = new Date(year, monthIndex + 8, 1).getDay();
    let days = '';

    for (let i = 0; i < firstDay; i++) {
        days += '<td></td>';
    }

    for (let day = 1; day <= month.days; day++) {

        const event = month.events ? month.events.find(e => e.date === day) : null;
        let dayClass = '';
        let eventHtml = '';
        if (event) {
            dayClass = 'event-day';
            eventHtml = `
                <div class="event-popup" id="event-${monthIndex}-${day}" style="display: none;">
                    <p>${event.startTime} - ${event.endTime}</p>
                    <p>${event.location}</p>
                    <p>${event.room}</p>
                    <a href="${event.zoomLink}" target="_blank" class="zoom-link">Join Zoom Meeting</a>
                </div>
            `;
        }
        days += `<td class="${dayClass}" onclick="toggleEventPopup(${monthIndex}, ${day})">${day} ${eventHtml}</td>`;
        if ((firstDay + day) % 7 === 0) {
            html += `<tr>${days}</tr>`;
            days = '';
        }
    }

    if (days.length > 0) {
        html += `<tr>${days}</tr>`;
    }

    html += `
            </tbody>
        </table>
    `;

    calendar.innerHTML = html;
    updateButtonStates();
}


function updateButtonStates() {
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');

    prevButton.disabled = currentMonthIndex === 0;
    prevButton.style.opacity = prevButton.disabled ? '0.5' : '1'; 

    nextButton.disabled = currentMonthIndex === months.length - 1;
    nextButton.style.opacity = nextButton.disabled ? '0.5' : '1'; 
}

let currentOpenEvent = null; 

function toggleEventPopup(monthIndex, day) {
    const popupId = `event-${monthIndex}-${day}`;
    const popup = document.getElementById(popupId);


    const allPopups = document.querySelectorAll('.event-popup');
    allPopups.forEach(p => {
        if (p.id !== popupId) {
            p.style.display = 'none';
        }
    });


    if (popup.style.display === 'block') {
        popup.style.display = 'none';
        currentOpenEvent = null;
    } else {
        popup.style.display = 'block';
        currentOpenEvent = popup;
    }
}


document.addEventListener('click', (event) => {
    if (currentOpenEvent && !currentOpenEvent.contains(event.target) && !event.target.closest('.event-day')) {
        currentOpenEvent.style.display = 'none';
        currentOpenEvent = null;
    }
});


renderCalendar(currentMonthIndex);


document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        renderCalendar(currentMonthIndex);
    }
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonthIndex < months.length - 1) {
        currentMonthIndex++;
        renderCalendar(currentMonthIndex);
    }
});
