const inputHours = document.getElementById('inputHours');
        const inputMinutes = document.getElementById('inputMinutes');
        const inputSeconds = document.getElementById('inputSeconds');
        const startButton = document.getElementById('startButton');
        const resetButton = document.getElementById('resetButton');
        const timeDisplay = document.getElementById('time-display');
        const progressBar = document.querySelector('.timer-progress-circle');
        const circumference = 2 * Math.PI * 90;

        progressBar.style.strokeDasharray = circumference;

        let timerInterval;
        let totalTimeInSeconds;
        let timePassedInSeconds = 0;

        function updateDisplay() {
            const remainingTime = totalTimeInSeconds - timePassedInSeconds;
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            const progress = timePassedInSeconds / totalTimeInSeconds;
            const offset = circumference * (1 - progress);
            progressBar.style.strokeDashoffset = offset;

            if (timePassedInSeconds >= totalTimeInSeconds) {
                clearInterval(timerInterval);
                timeDisplay.textContent = "Time's up!";
                progressBar.style.strokeDashoffset = 0;
            }

            timePassedInSeconds++;
        }

        startButton.addEventListener('click', () => {
            clearInterval(timerInterval);

            const hours = parseInt(inputHours.value) || 0;
            const minutes = parseInt(inputMinutes.value) || 0;
            const seconds = parseInt(inputSeconds.value) || 0;

            totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
            timePassedInSeconds = 0;

            if (totalTimeInSeconds <= 0) {
                timeDisplay.textContent = "Please enter a valid time!";
                return;
            }

            updateDisplay();
            timerInterval = setInterval(updateDisplay, 1000);
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timePassedInSeconds = 0;
            totalTimeInSeconds = 0;
            timeDisplay.textContent = "00:00:00";
            progressBar.style.strokeDashoffset = circumference;
            inputHours.value = '';
            inputMinutes.value = '';
            inputSeconds.value = '';
        });
