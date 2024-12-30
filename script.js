// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completely loaded and initialized.');


    // consts
    const form = document.getElementById('filters');
    const resultElement = document.getElementById('idea');
    const jsonURL = './ideas.json'; // Ruta al archivo JSON
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeLabel = document.getElementById("darkModeLabel");

    //dark mode consts
    const body = document.body;
    const container = document.querySelector(".container");
    const h1 = document.querySelector("h1");
    const resultsHeader = document.querySelector("#results h2");
    const generateButton = document.querySelector("button");
    const ideaResult = document.querySelector("#idea");
    const credits = document.querySelector("#credits");
    const technologyButton = document.querySelector("#technology");


    darkModeToggle.addEventListener("change", () => {
        const isDarkMode = darkModeToggle.checked;

        body.classList.toggle("dark-mode", isDarkMode);
        container.classList.toggle("dark-mode", isDarkMode);
        h1.classList.toggle("dark-mode", isDarkMode);
        resultsHeader.classList.toggle("dark-mode", isDarkMode);
        generateButton.classList.toggle("dark-mode", isDarkMode);
        ideaResult.classList.toggle("dark-mode", isDarkMode);
        credits.classList.toggle("dark-mode", isDarkMode);
        technologyButton.classList.toggle("dark-mode", isDarkMode);

        darkModeLabel.textContent = `Dark Mode: ${darkModeToggle.checked ? 'On' : 'Off'}`;
    });

    let projectIdeas = [];

    fetch(jsonURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            projectIdeas = data;
            console.log('Ideas cargadas:', projectIdeas);
        })
        .catch(error => console.error('Error when loading JSON:', error));

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form sent');

            const skillLevel = document.getElementById('skillLevel').value.trim();
            const technology = document.getElementById('technology').value.trim().toLowerCase();
            const category = document.getElementById('category').value.trim().toLowerCase();

            // show user critera
            console.log('User criteria:', { skillLevel, technology, category });

            const filteredIdeas = projectIdeas.filter(idea => {
                const matchesSkill = skillLevel
                    ? idea.skillLevel.toLowerCase() === skillLevel.toLowerCase()
                    : true;
                const matchesTech = technology
                    ? idea.technologies.some(tech => tech.toLowerCase().includes(technology))
                    : true;
                const matchesCategory = category
                    ? idea.category.toLowerCase() === category.toLowerCase()
                    : true;

                console.log({
                    idea,
                    matchesSkill,
                    matchesTech,
                    matchesCategory,
                });

                return matchesSkill && matchesTech && matchesCategory;
            });

            const randomIdea = filteredIdeas[Math.floor(Math.random() * filteredIdeas.length)];

            if (randomIdea) {
                resultElement.textContent = randomIdea.title;
            } else {
                resultElement.textContent = 'No ideas found. Try changing your filters.';
            }
        });
    } else {
        console.error("Form with ID 'filters' not found.");
    }
});
