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
        const title = section.querySelector(".game-info h2")?.innerText.toLowerCase() || "";
        const year = section.querySelector(".game-year")?.innerText.toLowerCase() || "";
        const cards = section.querySelectorAll(".website-card");

        let sectionMatched = false;
        let cardMatchCount = 0;

        // ✅ 1. GAME TITLE MATCH → show full section
        if (title.includes(query) || year.includes(query)) {
            sectionMatched = true;
            section.style.display = "block";

            cards.forEach(card => {
                card.style.display = "block";
            });
            return; // IMPORTANT: skip card filtering
        }

        // ✅ 2. Otherwise → filter cards only
        cards.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            const match = cardText.includes(query);

            card.style.display = match ? "block" : "none";
            if (match) cardMatchCount++;
        });

        // Show section only if at least one card matched
        section.style.display = cardMatchCount > 0 ? "block" : "none";
    });
});
