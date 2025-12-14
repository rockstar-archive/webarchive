document.getElementById("siteSearch").addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const sections = document.querySelectorAll(".game-section");

    // Reset if search is empty or too short
    if (query.length < 2) {
        sections.forEach(section => {
            section.style.display = "block";
            section.querySelectorAll(".website-card").forEach(card => {
                card.style.display = "block";
            });
        });
        return;
    }

    sections.forEach(section => {
        const title = section.querySelector(".game-info h2")?.textContent?.toLowerCase() || "";
        const year = section.querySelector(".game-year")?.textContent?.toLowerCase() || "";
        const cards = section.querySelectorAll(".website-card");

        // Reset section and cards first
        section.style.display = "none";
        cards.forEach(card => {
            card.style.display = "none";
        });

        // GAME TITLE/YEAR MATCH → show full section
        if (title.includes(query) || year.includes(query)) {
            section.style.display = "block";
            cards.forEach(card => {
                card.style.display = "block";
            });
            return; // Skip card filtering
        }

        // Otherwise → filter cards only
        let cardMatchCount = 0;
        cards.forEach(card => {
            // Get all text content including child elements
            const cardText = card.textContent?.toLowerCase() || card.innerText?.toLowerCase() || "";
            if (cardText.includes(query)) {
                card.style.display = "block";
                cardMatchCount++;
            }
        });

        // Show section only if at least one card matched
        if (cardMatchCount > 0) {
            section.style.display = "block";
        }
    });
});