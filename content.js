function getProfileData() {

  const nameElement = document.querySelector("h1");
  const headlineElement = document.querySelector("div.text-body-medium");

  const pageText = document.body.innerText || "";

  return {
    name: nameElement ? nameElement.innerText : "",
    headline: headlineElement ? headlineElement.innerText : "",
    about: pageText.includes("About"),
    experience: pageText.includes("Experience"),
    skills: pageText.includes("Skills")
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.type === "GET_PROFILE_DATA") {

    // IMPORTANT: delay execution for LinkedIn SPA
    setTimeout(() => {
      sendResponse(getProfileData());
    }, 1500);

    return true; // KEEP CHANNEL OPEN
  }
});

