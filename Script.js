const username = "husainxdev";

// Typed Animation
var typed = new Typed('#typed', {
    strings: ["Web Developer", "Programmer", "Tech Enthusiast"],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
});

// Theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

// GitHub Stats
axios.get(`https://api.github.com/users/${username}`)
.then(res => {
    document.getElementById('repos').innerText = res.data.public_repos;
    document.getElementById('followers').innerText = res.data.followers;
    document.getElementById('following').innerText = res.data.following;
})
.catch(err => console.log(err));

// GitHub Projects
axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
.then(res => {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    res.data.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : "No description provided."}</p>
            <a href="${repo.html_url}" target="_blank" class="btn">View Repo</a>
        `;
        projectsGrid.appendChild(card);
    });

    // GitHub Chart
    const labels = res.data.map(r => r.name);
    const stars = res.data.map(r => r.stargazers_count);
    const forks = res.data.map(r => r.forks_count);

    const ctx = document.getElementById('github-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Stars', data: stars, backgroundColor: '#ffdd00' },
                { label: 'Forks', data: forks, backgroundColor: '#2575fc' }
            ]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
})
.catch(err => console.log(err));
