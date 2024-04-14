// Set the target date for the countdown (New Year's Eve)
// const userDate = document.getElementById("userdate");
// const userTime = document.getElementById("usertime");




// document.getElementById("usersubmit").addEventListener("submit", async (event) => {
//     event.preventDefault();


//     const usertargetdate = userDate.value;
//     const usertargettime = userTime.value;
//     const usertd = (usertargetdate + " " + usertargettime + ":00")

//     console.log(usertd)
//     console.log(userDate.value)


//     if (usertd) {


//         const targetDate = new Date(usertd).getTime();
//         function updateCountdown() {
//             const currentDate = new Date().getTime();
//             const timeDifference = targetDate - currentDate;
//             if (timeDifference <= 0) {
//                 document.getElementById('days').innerText = 0;
//                 document.getElementById('hours').innerText = 0;
//                 document.getElementById('minutes').innerText = 0;
//                 document.getElementById('seconds').innerText = 0;

//             }

//             else {
//                 const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//                 const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//                 const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//                 const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//                 document.getElementById('days').innerText = days;
//                 document.getElementById('hours').innerText = hours;
//                 document.getElementById('minutes').innerText = minutes;
//                 document.getElementById('seconds').innerText = seconds;


//             }

//         }

//         updateCountdown();

//         // Update the countdown every second
//         setInterval(updateCountdown, 1000);


//     }
// })


if (Notification.permission === "granted") {
    document.getElementById("fa-bell").style.color = "#5129C0";
}

else if (Notification.permission === "default") {
    document.getElementById("fa-bell").style.color = "";
}

else {
    document.getElementById("fa-bell").style.color = "rgb(169, 62, 62)";

}


function showNotification(message, duration = 1000) {
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
    }

    if (Notification.permission === "granted") {
        const notification = new Notification("Notification Status", {
            body: message,
        });

        setTimeout(() => {
            notification.close();
        }, duration);
    } else if (Notification.permission === "denied") {
        document.getElementById("fa-bell").style.color = "rgb(169, 62, 62)";
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showNotification(message);
            }
        });
    }
}

document.getElementById("toggleNotificationBtn").addEventListener("click", () => {


    Notification.requestPermission().then(permission => {
        if (Notification.permission === 'granted') {
            new Notification("PRAS Clock", {
                body: `Notifications Enabled`,
                image: "img/web-bg.png",
                icon: "img/time001.png"
            });
            document.getElementById("fa-bell").style.color = "#5129C0";
        } else if (permission === "denied") {
            document.getElementById("fa-bell").style.color = "rgb(169, 62, 62)";
            showNotification("Notifications disabled!");

        }
    });
});

function setIntervalForNotifications() {
    const notificationInterval = 1800000; // 30 minutes in milliseconds

    const notify = () => {
        const currentFormattedTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
        const finalUTCtime =   `${new Date().getUTCHours().toString().padStart(2, '0')}:${new Date().getUTCMinutes().toString().padStart(2, '0')}:${new Date().getUTCSeconds().toString().padStart(2, '0')}`;
        const notf = new Notification("PRAS Clock", {
            body: `UTC:   ${finalUTCtime}\nLocal:   ${currentFormattedTime}`,
            image: "img/web-bg.png",
            icon: "img/time001.png"
        });

        console.log(notf)
    };

    setTimeout(() => {
        notify();
        setInterval(() => {
            notify();
        }, notificationInterval);
    }, notificationInterval);
}

function clock12h() {
    const currentDateTime = new Date();
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentFormattedTime = currentDateTime.toLocaleString('en-US', options);
    const year = new Date().getFullYear().toString().padStart(4, '0');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const date = new Date().getDate().toString().padStart(2, '0');
    const finalDate = `${date}-${month}-${year}`;

    document.getElementById("c-hours").innerText = currentFormattedTime;
    document.getElementById("c-date").innerText = finalDate;
}

function clock24h() {
    const hour = new Date().getHours().toString().padStart(2, '0');
    const mins = new Date().getMinutes().toString().padStart(2, '0');
    const secs = new Date().getSeconds().toString().padStart(2, '0');
    const year = new Date().getFullYear().toString().padStart(4, '0');
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const date = new Date().getDate().toString().padStart(2, '0');
    const finaltime = `${hour}:${mins}:${secs}`;
    const finalDate = `${date}-${month}-${year}`;

    document.getElementById("c-hours").innerText = finaltime;
    document.getElementById("c-date").innerText = finalDate;
}

function clockUTC() {
    const hour = new Date().getUTCHours().toString().padStart(2, '0');
    const mins = new Date().getUTCMinutes().toString().padStart(2, '0');
    const secs = new Date().getUTCSeconds().toString().padStart(2, '0');
    const year = new Date().getUTCFullYear().toString().padStart(4, '0');
    const month = (new Date().getUTCMonth() + 1).toString().padStart(2, '0');
    const date = new Date().getUTCDate().toString().padStart(2, '0');
    const finaltime = `${hour}:${mins}:${secs}`;
    const finalDate = `${date}-${month}-${year}`;

    document.getElementById("c-hours").innerText = finaltime;
    document.getElementById("c-date").innerText = finalDate;
}

let intervalId;

function setupClock() {
    const storedClockType = localStorage.getItem("clockType");

    setIntervalForNotifications();

    if (storedClockType === "24h") {
        clock24h();
        document.getElementById("24h").classList.add("active");
        intervalId = setInterval(clock24h, 1000);
    } else if (storedClockType === "12h") {
        clock12h();
        document.getElementById("12h").classList.add("active");
        intervalId = setInterval(clock12h, 1000);
    } else {
        clockUTC();
        document.getElementById("UTC").classList.add("active");
        intervalId = setInterval(clockUTC, 1000);
    }
}

document.getElementById("12h").addEventListener("click", async (event) => {
    document.getElementById("12h").classList.add("active");
    document.getElementById("24h").classList.remove("active");
    document.getElementById("UTC").classList.remove("active");
    clearInterval(intervalId);
    clock12h();
    intervalId = setInterval(clock12h, 1000);
    localStorage.setItem("clockType", "12h");
});

document.getElementById("24h").addEventListener("click", async (event) => {
    document.getElementById("24h").classList.add("active");
    document.getElementById("12h").classList.remove("active");
    document.getElementById("UTC").classList.remove("active");
    clearInterval(intervalId);
    clock24h();
    intervalId = setInterval(clock24h, 1000);
    localStorage.setItem("clockType", "24h");
});

document.getElementById("UTC").addEventListener("click", async (event) => {
    document.getElementById("UTC").classList.add("active");
    document.getElementById("12h").classList.remove("active");
    document.getElementById("24h").classList.remove("active");
    clearInterval(intervalId);
    clockUTC();
    intervalId = setInterval(clockUTC, 1000);
    localStorage.setItem("clockType", "UTC");
});

setupClock();
