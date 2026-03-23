// Get form
const form = document.getElementById("form");

// Prevent default submit (no page refresh)
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get all values
    const data = new FormData(form);

    // Build output HTML (THIS is your intro page)
    let output = `
        <h2>Introduction Form</h2>
        <h3>
            ${data.get("firstName")} ${data.get("middleName") || ""} "${data.get("nickname") || ""}" ${data.get("lastName")}
            ${data.get("divider")} ${data.get("mascotAdj")} ${data.get("mascotAnimal")}
        </h3>
    `;

    // Image preview
    const file = form.querySelector('input[type="file"]').files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        output += `
            <figure>
                <img src="${imageURL}" alt="User Image" style="max-width:300px;">
                <figcaption>${data.get("imageCaption")}</figcaption>
            </figure>
        `;
    }

    // Main sections
    output += `
        <ul>
            <li><strong>Personal Background:</strong> ${data.get("personalBg")}</li>
            <li><strong>Academic Background:</strong> ${data.get("academicBg")}</li>
            <li><strong>Professional Background:</strong> ${data.get("professionalBg")}</li>
            <li><strong>Subject Background:</strong> ${data.get("subjectBg")}</li>
            <li><strong>Personal Statement:</strong> ${data.get("personalStatement")}</li>
        </ul>

        <p><strong>Quote:</strong> "${data.get("quote")}" - ${data.get("quoteAuthor")}</p>
    `;

    // Optional fields
    if (data.get("funny")) {
        output += `<p><strong>Funny Thing:</strong> ${data.get("funny")}</p>`;
    }

    if (data.get("share")) {
        output += `<p><strong>Something to Share:</strong> ${data.get("share")}</p>`;
    }

    // Links
    output += `<ul>`;
    for (let i = 1; i <= 5; i++) {
        const link = data.get("link" + i);
        if (link) {
            output += `<li><a href="${link}" target="_blank">${link}</a></li>`;
        }
    }
    output += `</ul>`;

    // Replace page content
    document.querySelector("main").innerHTML = output + `
        <br><a href="intro_form.html">Reset</a>
    `;
});


// Clear button (empties all fields)
document.getElementById("clearBtn").addEventListener("click", function () {
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.type !== "file") el.value = "";
    });
});
