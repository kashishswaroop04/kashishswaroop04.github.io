const form = document.getElementById("form");

// Prevent refresh + generate page
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);

    let output = `
        <h2>Introduction Form</h2>
        <h3>
            ${data.get("firstName")} ${data.get("middleName") || ""} "${data.get("nickname") || ""}" ${data.get("lastName")}
            ${data.get("divider")} ${data.get("mascotAdj")} ${data.get("mascotAnimal")}
        </h3>
    `;

    // Image
    const file = form.querySelector('input[type="file"]').files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        output += `
            <figure>
                <img src="${imageURL}" style="max-width:300px;">
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
    `;

    // Courses output
    output += "<h3>Courses</h3><ul>";
    document.querySelectorAll(".course").forEach(course => {
        const inputs = course.querySelectorAll("input");
        output += `<li>${inputs[0].value} ${inputs[1].value} - ${inputs[2].value} (${inputs[3].value})</li>`;
    });
    output += "</ul>";

    // Quote
    output += `<p>"${data.get("quote")}" - ${data.get("quoteAuthor")}</p>`;

    // Replace page
    document.querySelector("main").innerHTML = output + `
        <br><a href="intro_form.html">Reset</a>
    `;
});


// Clear button
document.getElementById("clearBtn").addEventListener("click", function () {
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.type !== "file") el.value = "";
    });
});


// ADD COURSE BUTTON
document.getElementById("addCourse").addEventListener("click", function () {
    const div = document.createElement("div");
    div.className = "course";

    div.innerHTML = `
        <input placeholder="Dept">
        <input placeholder="Number">
        <input placeholder="Name">
        <input placeholder="Reason">
        <button type="button" onclick="this.parentElement.remove()">Delete</button>
        <br><br>
    `;

    document.getElementById("courses").appendChild(div);
});
