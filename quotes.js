document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("quoteWrapper");
  const box = document.getElementById("quoteBox");
  
  // Inline quotes array
  const quotes = [
    "WAKE UP ITS v0.7.8 UPDATE DROP!!! :kirby/wake::kirby/wake::kirby/wake:",
    "'rhap5ody add in the COMING SOON assets 🗣🗣🗣' rhap5ody be like: :anime/deny.gif:",
    ":miku/joy::miku/joy::miku/joy:",
    "v0.7.8 dropped :miku/swaying.gif:",
    "rhap5ody::linux/typing.gif:",
    "V0.7.8 IS HERE :stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz::stickman/spazz:",
    "WAKE UP MR WEST :grad-run:",
    "page 4 completed??!! :gwahh.jpeg::gwahh.jpeg::gwahh.jpeg:",
    "wait if v0.7.8 is here then when is v0.7.9 coming out? :think.jpg: 👀",
    "VERSION V0.7.8 OUT NOWWWWWW!!! :csm/pochita-dance.gif::csm/pochita-dance.gif::csm/pochita-dance.gif:",
    ":kanye-gaming.jpeg:",
    "checkout the amazing new themes! :grad-painted.jpeg:",
    ":miku/swaying.gif: Friday Night Funkin' :miku/swaying.gif:",
    "due to some changes themes will be tempararily disabled until further notice. :sackboy/dieying.gif:",
    ":nintendo/dance: PAGE 5 COMPLETED! :nintendo/dance:"
  ];
  
  let pos = 0;
  let lastTime = null;
  const baseSpeed = 120;
  const slowSpeed = 70;
  const slowerSpeed = 30;
  let currentSpeed = baseSpeed;
  let isHoveringBox = false;
  let isHoveringText = false;
  let isMouseDown = false;
  
  /* ==========================================
     Quote Image Parser
     Supports:
     :name:
     :folder/name:
     :folder/name.gif:
     ========================================== */
  function parseQuoteWithImages(text) {
    return text.replace(
      /:([a-zA-Z0-9_\-\/]+(?:\.(png|gif|webp|jpg|jpeg))?):/gi,
      (match, path, ext) => {
        // Prevent path traversal
        if (path.includes("..")) return match;
        // Explicit extension → use as-is
        if (ext) {
          return `
            <img
              src="https://raw.githubusercontent.com/01110010-00110101/01110010-00110101.github.io/main/system/images/stickers/${path}"
              class="quote-sticker"
              alt="${path}"
              loading="lazy"
            >
          `;
        }
        // No extension → png fallback to gif
        return `
          <img
            src="https://raw.githubusercontent.com/01110010-00110101/01110010-00110101.github.io/main/system/images/stickers/${path}.png"
            class="quote-sticker"
            alt="${path}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/01110010-00110101/01110010-00110101.github.io/main/system/images/stickers/${path}.gif';"
          >
        `;
      }
    );
  }
  
  function setQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    box.innerHTML = parseQuoteWithImages(quote);
    pos = wrapper.offsetWidth;
    box.style.transform = `translateX(${pos}px)`;
  }
  
  function updateSpeed() {
    if (isMouseDown) currentSpeed = 0;
    else if (isHoveringText) currentSpeed = slowerSpeed;
    else if (isHoveringBox) currentSpeed = slowSpeed;
    else currentSpeed = baseSpeed;
  }
  
  function animate(time) {
    if (lastTime !== null) {
      const dt = (time - lastTime) / 1000;
      pos -= currentSpeed * dt;
      box.style.transform = `translateX(${pos}px)`;
      if (pos + box.offsetWidth < 0) {
        setQuote();
      }
    }
    lastTime = time;
    requestAnimationFrame(animate);
  }
  
  function start() {
    setQuote();
    requestAnimationFrame(animate);
  }
  
  wrapper.addEventListener("mouseenter", () => {
    isHoveringBox = true;
    updateSpeed();
  });
  
  wrapper.addEventListener("mouseleave", () => {
    isHoveringBox = false;
    isHoveringText = false;
    updateSpeed();
  });
  
  box.addEventListener("mouseenter", () => {
    isHoveringText = true;
    updateSpeed();
  });
  
  box.addEventListener("mouseleave", () => {
    isHoveringText = false;
    updateSpeed();
  });
  
  wrapper.addEventListener("mousedown", () => {
    isMouseDown = true;
    updateSpeed();
  });
  
  wrapper.addEventListener("mouseup", () => {
    isMouseDown = false;
    updateSpeed();
  });
  
  // Start immediately since quotes are inline
  start();
});