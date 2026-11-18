document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("soundcloud-player");
    const button = document.getElementById("soundcloud-toggle");
    const selector = document.getElementById("soundcloud-select");
    const trackLabel = document.querySelector(".soundcloud-track");

    if (!iframe || !button) return;

    function initializePlayer() {
        if (!window.SC || !window.SC.Widget) {
            window.setTimeout(initializePlayer, 150);
            return;
        }

        const widget = SC.Widget(iframe);
        let playing = false;

        widget.bind(SC.Widget.Events.READY, function () {
            button.addEventListener("click", function () {
                if (playing) widget.pause();
                else widget.play();
            });

            if (selector) {
                widget.getSounds(function (sounds) {
                    selector.innerHTML = "";
                    sounds.forEach(function (sound, index) {
                        const option = document.createElement("option");
                        option.value = index;
                        option.textContent = sound.title;
                        selector.appendChild(option);
                    });

                    selector.disabled = sounds.length === 0;
                    selector.addEventListener("change", function () {
                        const index = Number(selector.value);
                        const selected = sounds[index];
                        if (!selected) return;
                        widget.skip(index);
                        if (trackLabel) trackLabel.textContent = selected.title;
                        widget.play();
                    });
                });
            }
        });

        widget.bind(SC.Widget.Events.PLAY, function () {
            playing = true;
            button.textContent = "Ⅱ";
            button.setAttribute("aria-label", "Pausar");
        });

        widget.bind(SC.Widget.Events.PAUSE, function () {
            playing = false;
            button.textContent = "▶";
            button.setAttribute("aria-label", "Reproducir");
        });

        widget.bind(SC.Widget.Events.FINISH, function () {
            playing = false;
            button.textContent = "▶";
            button.setAttribute("aria-label", "Reproducir");
        });
    }

    initializePlayer();
});
