// Courtesy of ChatGPT waow
class PausableCountdownTimer {
    constructor(duration) {
        this.duration = duration;
        this.remainingTime = duration;
        this.status = "stopped";
    }
    start() {
        if (this.status === "running") {
            return;
        }
        if (this.status === "stopped") {
            this.remainingTime = this.duration;
        }
        this.status = "running";
        this.timerId = setInterval(() => {
            this.remainingTime -= 100;
            document.getElementById("time_left").innerText = this.formatTime(this.remainingTime);
            if (this.remainingTime < 0) {
                this.stop();
            }
        }, 100);
    }
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const minutesString = String(minutes).padStart(2, "0");
        const secondsString = String(seconds).padStart(2, "0");
        return `${minutesString}:${secondsString}`;
    }
    pause() {
        if (this.status !== "running") {
            return;
        }
        clearInterval(this.timerId);
        this.status = "paused";
    }
    resume() {
        if (this.status !== "paused") {
            return;
        }
        this.status = "running";
        this.timerId = setInterval(() => {
            this.remainingTime -= 100;
            document.getElementById("time_left").innerText = this.formatTime(this.remainingTime);
            if (this.remainingTime < 0) {
                this.stop();
            }
        }, 100);
    }
    stop() {
        clearInterval(this.timerId);
        this.status = "stopped";
        this.remainingTime = this.duration;
    }
    getTime() {
        return this.remainingTime;
    }
    getStatus() {
        return this.status;
    }
}
//# sourceMappingURL=timer.js.map