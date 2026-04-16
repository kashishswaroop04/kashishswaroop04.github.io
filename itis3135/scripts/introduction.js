const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = new FormData(form);

    let output = `
        <h2>Introduction</h2>
        <h3>
            ${data.get("firstName")} ${data.get("middleName") || ""} ${data.get("nickname") ? `"${data.get("nickname")}"` : ""} ${data.get("lastName")}
            ${data.get("divider")} ${data.get("mascotAdj")} ${data.get("mascotAnimal")}
        </h3>
    `;

    const file = form.querySelector('input[type="file"]').files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        output += `
            <figure>
                <img src="${imageURL}" alt="Uploaded image" style="max-width:300px;">
                <figcaption>${data.get("imageCaption")}</figcaption>
            </figure>
        `;
    }

    output += `
        <ul>
            <li><strong>Personal Background:</strong> ${data.get("personalBg")}</li>
            <li><strong>Academic Background:</strong> ${data.get("academicBg")}</li>
            <li><strong>Professional Background:</strong> ${data.get("professionalBg")}</li>
            <li><strong>Subject Background:</strong> ${data.get("subjectBg")}</li>
            <li><strong>Personal Statement:</strong> ${data.get("personalStatement")}</li>
        </ul>
    `;

    const courseBlocks = document.querySelectorAll(".course");
    if (courseBlocks.length > 0) {
        output += "<h3>Courses</h3><ul>";
        courseBlocks.forEach(course => {
            const inputs = course.querySelectorAll("input");
            output += `<li><strong>${inputs[0].value} ${inputs[1].value} - ${inputs[2].value}:</strong> ${inputs[3].value}</li>`;
        });
        output += "</ul>";
    }

    output += `
        <p><strong>Favorite Quote:</strong> "${data.get("quote")}" - ${data.get("quoteAuthor")}</p>
    `;

    if (data.get("funny")) {
        output += `<p><strong>Funny Thing:</strong> ${data.get("funny")}</p>`;
    }

    if (data.get("share")) {
        output += `<p><strong>Something to Share:</strong> ${data.get("share")}</p>`;
    }

    const links = [
        data.get("link1"),
        data.get("link2"),
        data.get("link3"),
        data.get("link4"),
        data.get("link5")
    ].filter(link => link && link.trim() !== "");

    if (links.length > 0) {
        output += "<h3>Links</h3><ul>";
        links.forEach(link => {
            output += `<li><a href="${link}" target="_blank">${link}</a></li>`;
        });
        output += "</ul>";
    }

    document.querySelector("main").innerHTML = output + `
        <br><a href="intro_form.html">Reset</a>
    `;
});

document.getElementById("clearBtn").addEventListener("click", function () {
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.type !== "file") {
            el.value = "";
        }
    });
    document.getElementById("courses").innerHTML = "";
});

document.getElementById("addCourse").addEventListener("click", function () {
    const div = document.createElement("div");
    div.className = "course";

    div.innerHTML = `
        <input type="text" placeholder="Dept" required>
        <input type="text" placeholder="Number" required>
        <input type="text" placeholder="Name" required>
        <input type="text" placeholder="Reason" required>
        <button type="button" onclick="this.parentElement.remove()">Delete</button>
        <br><br>
    `;

    document.getElementById("courses").appendChild(div);
});
