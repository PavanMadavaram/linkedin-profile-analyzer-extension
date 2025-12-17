document.getElementById("analyzeBtn").addEventListener("click", () => {

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "GET_PROFILE_DATA" },
      (data) => {

        if (!data) {
          document.getElementById("result").innerHTML =
            "<p style='color:red'>No data received. Refresh page.</p>";
          return;
        }

        let score = 0;
        let feedback = [];

        if (data.headline) score += 25;
        else feedback.push("Add a strong headline");

        if (data.about) score += 25;
        else feedback.push("Add About section");

        if (data.experience) score += 25;
        else feedback.push("Add Experience details");

        if (data.skills) score += 25;
        else feedback.push("Add Skills section");

        document.getElementById("result").innerHTML = `
          <p><b>Profile Score:</b> ${score}/100</p>
          <ul>${feedback.map(item => `<li>${item}</li>`).join("")}</ul>
        `;
      }
    );

  });
});
