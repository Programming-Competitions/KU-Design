$(document).ready(function () {
    $("#calendar").evoCalendar({
        calendarEvents: [
            {
                id: 'bHay68s', // Event's ID (required)
                name: "New Year", // Event name (required)
                date: "OCTOBER/1/2023", // Event date (required)
                type: "holiday", // Event type (required)
                everyYear: true // Same event every year (optional)
            },
            {
                name: "Vacation Leave",
                badge: "02/13 - 02/15", // Event badge (optional)
                date: ["February/13/2023", "February/15/2023"], // Date range
                description: "Vacation leave for 3 days.", // Event description (optional)
                type: "event",
                color: "#63d867" // Event custom color (optional)
            }
        ]
    });
})