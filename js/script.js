// Get the project form and project list
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

// Load previously saved projects
let projects = getData("mcaProjects");

// Display projects on the website
function displayProjects() {

    projectList.innerHTML = "";

    if (projects.length === 0) {
        projectList.textContent = "No projects added yet.";
        return;
    }

    projects.forEach(function(project) {

        const card = document.createElement("div");
        card.className = "card";

        const name = document.createElement("h3");
        name.textContent = project.name;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technology = document.createElement("p");
        technology.textContent =
            "Technologies: " + project.technology;

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", function() {

            const newName = prompt("Enter new project name:", project.name);

            if (newName === null || newName.trim() === "") return;

            const newDescription = prompt(
                "Enter new description:", project.description
            );

            if (newDescription === null || newDescription.trim() === "") return;

            const newTechnology = prompt(
                "Enter new technologies:", project.technology
            );

            if (newTechnology === null || newTechnology.trim() === "") return;

            project.name = newName.trim();
            project.description = newDescription.trim();
            project.technology = newTechnology.trim();

            saveData("mcaProjects", projects);
            displayProjects();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            projects = projects.filter(function(item) {
                return item.id !== project.id;
            });

            saveData("mcaProjects", projects);
            displayProjects();
        });

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(technology);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        projectList.appendChild(card);
    });
}
// Add new project
projectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("projectName").value;
    const description = document.getElementById("projectDescription").value;
    const technology = document.getElementById("projectTechnology").value;

    const newProject = {
        id: Date.now(),
        name: name,
        description: description,
        technology: technology
    };

    // Add project to array
    projects.push(newProject);

    // Save projects
    saveData("mcaProjects", projects);

    // Display updated projects
    displayProjects();

    // Clear form
    projectForm.reset();

});

// Show saved projects when page opens
displayProjects();

// TECHNICAL REPORT UPLOAD

const reportForm = document.getElementById("reportForm");
const reportList = document.getElementById("reportList");

// Display uploaded reports
async function displayReports() {

    try {

        const reports = await getAllReports();

        reportList.innerHTML = "";

        if (reports.length === 0) {
            reportList.textContent = "No technical reports uploaded yet.";
            return;
        }

        reports.forEach(function(report) {

            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = report.title;

            const fileName = document.createElement("p");
            fileName.textContent = report.fileName;

            // Create preview URL
            const fileURL = URL.createObjectURL(report.file);

            // Preview PDF
            const preview = document.createElement("a");
            preview.href = fileURL;
            preview.target = "_blank";
            preview.textContent = "View PDF";
            preview.className = "btn";

            // Download PDF
            const download = document.createElement("a");
            download.href = fileURL;
            download.download = report.fileName;
            download.textContent = "Download";
            download.className = "btn";

            // Delete report
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", async function() {

                const confirmDelete = confirm("Delete this report?");

                if (confirmDelete) {
                    await deleteReport(report.id);
                    displayReports();
                }

            });

            card.appendChild(title);
            card.appendChild(fileName);
            card.appendChild(preview);
            card.appendChild(download);
            card.appendChild(deleteButton);

            reportList.appendChild(card);

        });

    } catch (error) {
        console.error("Error loading reports:", error);
        reportList.textContent = "Unable to load reports.";
    }
}

// Upload report when form is submitted
if (reportForm) {

    reportForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const title = document.getElementById("reportTitle").value.trim();
        const file = document.getElementById("reportFile").files[0];

        if (!file || file.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }

        try {

            const newReport = {
                id: Date.now(),
                title: title,
                fileName: file.name,
                file: file
            };

            await saveReport(newReport);

            alert("Report uploaded successfully!");

            reportForm.reset();

            displayReports();

        } catch (error) {

            console.error("Upload error:", error);
            alert("Unable to upload report. Please try again.");

        }

    });

}

// Load reports when page opens
displayReports();

