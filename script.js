// Tab Switching Logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// Enable horizontal scroll with mouse wheel for tabs
const tabsContainer = document.querySelector('.form-tabs');
if (tabsContainer) {
    tabsContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        tabsContainer.scrollLeft += evt.deltaY;
    });
}

// Dynamic Lists Management
const lists = {
    experience: document.getElementById('experience-list'),
    education: document.getElementById('education-list'),
    courses: document.getElementById('courses-list'),
    skills: document.getElementById('skills-list'),
    projects: document.getElementById('projects-list'),
    achievements: document.getElementById('achievements-list'),
    volunteer: document.getElementById('volunteer-list'),
    references: document.getElementById('references-list')
};

function createDynamicItem(type, data = {}) {
    const id = Date.now() + Math.random();
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.dataset.id = id;

    if (type === 'experience') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group">
                    <label>Date Range</label>
                    <input type="text" class="exp-date" placeholder="Jan 2022 — Jul 2023" value="${data.date || ''}">
                </div>
                <div class="input-group">
                    <label>Location</label>
                    <input type="text" class="exp-location" placeholder="Kathmandu" value="${data.location || ''}">
                </div>
            </div>
            <div class="input-group">
                <label>Job Title & Company</label>
                <input type="text" class="exp-title" placeholder="DevOps Engineer, eSewa Ltd." value="${data.title || ''}">
            </div>
            <div class="input-group">
                <label>Key Responsibilities (one per line)</label>
                <textarea class="exp-desc" rows="4">${data.desc || ''}</textarea>
            </div>
        `;
    } else if (type === 'education') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group">
                    <label>Date Range</label>
                    <input type="text" class="edu-date" placeholder="2016 — 2021" value="${data.date || ''}">
                </div>
                <div class="input-group">
                    <label>Location</label>
                    <input type="text" class="edu-location" placeholder="Kathmandu" value="${data.location || ''}">
                </div>
            </div>
            <div class="input-group">
                <label>Degree & Institution</label>
                <input type="text" class="edu-title" placeholder="Bachelor of Information and Technology..." value="${data.title || ''}">
            </div>
        `;
    } else if (type === 'courses') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group">
                    <label>Date Range</label>
                    <input type="text" class="course-date" placeholder="Aug 2023 — Nov 2023" value="${data.date || ''}">
                </div>
                <div class="input-group">
                    <label>Institution (Optional)</label>
                    <input type="text" class="course-inst" placeholder="Broadway Infosys" value="${data.inst || ''}">
                </div>
            </div>
            <div class="input-group">
                <label>Course Name</label>
                <input type="text" class="course-title" placeholder="AWS Associate Solution Architecture" value="${data.title || ''}">
            </div>
        `;
    } else if (type === 'skills') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group">
                    <label>Category (e.g. Tools)</label>
                    <input type="text" class="skill-cat" placeholder="DevOps Tools" value="${data.cat || ''}">
                </div>
                <div class="input-group">
                    <label>Skills (comma separated)</label>
                    <input type="text" class="skill-vals" placeholder="Docker, K8s, Jenkins" value="${data.vals || ''}">
                </div>
            </div>
        `;
    } else if (type === 'projects') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-group">
                <label>Project Title / Tools</label>
                <input type="text" class="proj-title" placeholder="Infrastructure Automation (Ansible, Docker)" value="${data.title || ''}">
            </div>
            <div class="input-group">
                <label>Outcome / Impact</label>
                <textarea class="proj-desc" rows="3" placeholder="Automated 100+ servers...">${data.desc || ''}</textarea>
            </div>
        `;
    } else if (type === 'achievements') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-group">
                <label>Award / Achievement Title</label>
                <input type="text" class="ach-title" placeholder="Employee of the Month" value="${data.title || ''}">
            </div>
            <div class="input-group">
                <label>Brief Description</label>
                <input type="text" class="ach-desc" placeholder="Recognized for outstanding performance..." value="${data.desc || ''}">
            </div>
        `;
    } else if (type === 'volunteer') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group" style="flex: 2;">
                    <label>Role & Organization</label>
                    <input type="text" class="vol-title" placeholder="Volunteer Teacher, Local School" value="${data.title || ''}">
                </div>
                <div class="input-group">
                    <label>Dates</label>
                    <input type="text" class="vol-date" placeholder="2020 - 2021" value="${data.date || ''}">
                </div>
            </div>
        `;
    } else if (type === 'references') {
        div.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="input-row">
                <div class="input-group">
                    <label>Name</label>
                    <input type="text" class="ref-name" placeholder="John Doe" value="${data.name || ''}">
                </div>
                <div class="input-group">
                    <label>Job Title & Company</label>
                    <input type="text" class="ref-title" placeholder="Manager, ABC Corp" value="${data.title || ''}">
                </div>
            </div>
            <div class="input-group">
                <label>Contact Info (Email/Phone)</label>
                <input type="text" class="ref-contact" placeholder="john@example.com | +977-..." value="${data.contact || ''}">
            </div>
        `;
    }

    // Attach listeners to new inputs
    div.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    return div;
}

function addExperience(data = {}) {
    lists.experience.appendChild(createDynamicItem('experience', data));
    updatePreview();
}

function addEducation(data = {}) {
    lists.education.appendChild(createDynamicItem('education', data));
    updatePreview();
}

function addCourse(data = {}) {
    lists.courses.appendChild(createDynamicItem('courses', data));
    updatePreview();
}

function addSkill(data = {}) {
    lists.skills.appendChild(createDynamicItem('skills', data));
    updatePreview();
}

function addProject(data = {}) {
    lists.projects.appendChild(createDynamicItem('projects', data));
    updatePreview();
}

function addAchievement(data = {}) {
    lists.achievements.appendChild(createDynamicItem('achievements', data));
    updatePreview();
}

function addVolunteer(data = {}) {
    lists.volunteer.appendChild(createDynamicItem('volunteer', data));
    updatePreview();
}

function addReference(data = {}) {
    lists.references.appendChild(createDynamicItem('references', data));
    updatePreview();
}

function removeItem(btn) {
    btn.parentElement.remove();
    updatePreview();
}

// Preview Update Logic
function updatePreview() {
    // Personal Info
    document.getElementById('preview-name').textContent = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('preview-title').textContent = document.getElementById('jobTitle').value || 'Job Title';
    document.getElementById('preview-address').textContent = document.getElementById('address').value;
    document.getElementById('preview-phone').textContent = document.getElementById('phone').value;
    document.getElementById('preview-email').textContent = document.getElementById('email').value;
    document.getElementById('preview-profile').textContent = document.getElementById('profileSummary').value;
    document.getElementById('preview-hobbies').textContent = document.getElementById('hobbies').value;
    document.getElementById('preview-languages').textContent = document.getElementById('languages').value;

    const sections = {
        languages: document.getElementById('section-languages'),
        achievements: document.getElementById('section-achievements'),
        volunteer: document.getElementById('section-volunteer'),
        references: document.getElementById('section-references')
    };

    if (sections.languages) sections.languages.style.display = document.getElementById('languages').value ? 'grid' : 'none';

    // Socials
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const website = document.getElementById('website').value;
    const socialContainer = document.getElementById('preview-socials');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        const socialLinks = [];
        if (linkedin) socialLinks.push(`LinkedIn: ${linkedin}`);
        if (github) socialLinks.push(`GitHub: ${github}`);
        if (website) socialLinks.push(`Website: ${website}`);
        socialContainer.innerHTML = socialLinks.join(' | ');
    }

    // Experience
    const expContainer = document.getElementById('preview-experience');
    if (expContainer) {
        expContainer.innerHTML = '';
        document.querySelectorAll('#experience-list .dynamic-item').forEach(item => {
            const date = item.querySelector('.exp-date').value;
            const location = item.querySelector('.exp-location').value;
            const titleComp = item.querySelector('.exp-title').value;
            const desc = item.querySelector('.exp-desc').value;
            const bullets = desc.split('\n').filter(line => line.trim() !== '').map(line => `<li>${line.trim()}</li>`).join('');

            expContainer.innerHTML += `
                <div class="resume-item">
                    <div class="item-date-sidebar">${date}</div>
                    <div class="item-details">
                        <div class="item-header">
                            <div class="item-title">${titleComp}</div>
                            <div class="item-location">${location}</div>
                        </div>
                        ${bullets ? `<ul class="item-details-bullets">${bullets}</ul>` : ''}
                    </div>
                </div>
            `;
        });
    }

    // Skills
    const skillsContainer = document.getElementById('preview-skills');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        document.querySelectorAll('#skills-list .dynamic-item').forEach(item => {
            const cat = item.querySelector('.skill-cat').value;
            const vals = item.querySelector('.skill-vals').value;
            if (cat || vals) {
                skillsContainer.innerHTML += `
                    <div class="skill-category">
                        <span class="skill-name">${cat}:</span>
                        <span class="skill-values">${vals}</span>
                    </div>
                `;
            }
        });
    }

    // Projects
    const projectsContainer = document.getElementById('preview-projects');
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        document.querySelectorAll('#projects-list .dynamic-item').forEach(item => {
            const title = item.querySelector('.proj-title').value;
            const desc = item.querySelector('.proj-desc').value;
            if (title || desc) {
                projectsContainer.innerHTML += `
                    <div class="project-item">
                        <div class="project-title">${title}</div>
                        <div class="project-desc">${desc}</div>
                    </div>
                `;
            }
        });
    }

    // Achievements
    const achContainer = document.getElementById('preview-achievements');
    if (achContainer && sections.achievements) {
        achContainer.innerHTML = '';
        const achItems = document.querySelectorAll('#achievements-list .dynamic-item');
        sections.achievements.style.display = achItems.length > 0 ? 'grid' : 'none';
        achItems.forEach(item => {
            const title = item.querySelector('.ach-title').value;
            const desc = item.querySelector('.ach-desc').value;
            if (title || desc) {
                achContainer.innerHTML += `
                    <div class="achievement-item">
                        <div class="achievement-title">${title}</div>
                        <div class="achievement-desc">${desc}</div>
                    </div>
                `;
            }
        });
    }

    // Volunteer
    const volContainer = document.getElementById('preview-volunteer');
    if (volContainer && sections.volunteer) {
        volContainer.innerHTML = '';
        const volItems = document.querySelectorAll('#volunteer-list .dynamic-item');
        sections.volunteer.style.display = volItems.length > 0 ? 'grid' : 'none';
        volItems.forEach(item => {
            const title = item.querySelector('.vol-title').value;
            const date = item.querySelector('.vol-date').value;
            if (title || date) {
                volContainer.innerHTML += `
                    <div class="volunteer-item">
                        <div class="volunteer-title">${title} (${date})</div>
                    </div>
                `;
            }
        });
    }

    // References
    const refContainer = document.getElementById('preview-references');
    if (refContainer && sections.references) {
        refContainer.innerHTML = '';
        const refItems = document.querySelectorAll('#references-list .dynamic-item');
        sections.references.style.display = refItems.length > 0 ? 'grid' : 'none';
        refItems.forEach(item => {
            const name = item.querySelector('.ref-name').value;
            const title = item.querySelector('.ref-title').value;
            const contact = item.querySelector('.ref-contact').value;
            if (name || title || contact) {
                refContainer.innerHTML += `
                    <div class="achievement-item">
                        <div class="achievement-title">${name}</div>
                        <div class="achievement-desc">${title} | ${contact}</div>
                    </div>
                `;
            }
        });
    }

    // Education
    const eduContainer = document.getElementById('preview-education');
    if (eduContainer) {
        eduContainer.innerHTML = '';
        document.querySelectorAll('#education-list .dynamic-item').forEach(item => {
            const date = item.querySelector('.edu-date').value;
            const location = item.querySelector('.edu-location').value;
            const title = item.querySelector('.edu-title').value;

            eduContainer.innerHTML += `
                <div class="resume-item">
                    <div class="item-date-sidebar">${date}</div>
                    <div class="item-details">
                        <div class="item-header">
                            <div class="item-title">${title}</div>
                            <div class="item-location">${location}</div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Courses
    const courseContainer = document.getElementById('preview-courses');
    if (courseContainer) {
        courseContainer.innerHTML = '';
        document.querySelectorAll('#courses-list .dynamic-item').forEach(item => {
            const date = item.querySelector('.course-date').value;
            const title = item.querySelector('.course-title').value;
            const inst = item.querySelector('.course-inst').value;

            courseContainer.innerHTML += `
                <div class="resume-item">
                    <div class="item-date-sidebar">${date}</div>
                    <div class="item-details">
                        <div class="item-title">${title} ${inst ? `, ${inst}` : ''}</div>
                    </div>
                </div>
            `;
        });
    }
}

// Initial Data Injection
function loadInitialData() {
    document.getElementById('profileSummary').value = "System and DevOps Engineer with 4+ years of hands-on IT experience. Specialized in infrastructure automation, cloud migrations, and maintaining high-availability systems. Proven track record in reducing operational overhead and improving system reliability.";
    document.getElementById('linkedin').value = "https://www.linkedin.com/in/sagarmalla08";
    document.getElementById('github').value = "https://github.com/UnstopableSafar08";
    document.getElementById('website').value = "www.sagarmalla.info.np";
    document.getElementById('languages').value = "English (Fluent), Nepali (Native), Hindi (Conversational)";

    addExperience({
        date: 'Jan 2022 — Jul 2023',
        location: 'Kathmandu',
        title: 'System and Network Administrator, Braindigit IT Solutions',
        desc: 'Administered on-prem Linux servers and enterprise network infrastructure supporting production workloads\nManaged DNS, firewall rules, ports, and access control across environments\nPerformed routine system operations using SOPs including patching, backups, and health checks\nTroubleshoot network and system incidents involving connectivity, latency, and service outages'
    });
    
    addExperience({
        date: 'Jul 2023 — Present',
        location: 'Lalitpur',
        title: 'DevOps Engineer, eSewa Ltd.',
        desc: 'Supported hybrid infrastructure with strong focus on on-prem production environments\nMaintained 24/7 availability through proactive monitoring and on-call incident response\nAutomated operational and deployment tasks using Ansible and Bash scripting\nAssisted with CI/CD pipeline execution and deployment verification using Jenkins'
    });

    addSkill({ cat: 'Technical Skills', vals: 'Linux, Docker, Ansible, Jenkins, Git, AWS, Python' });
    addSkill({ cat: 'Soft Skills', vals: 'Communication, Teamwork, Leadership, Problem Solving' });
    addSkill({ cat: 'Monitoring', vals: 'Prometheus, Grafana, ELK Stack' });

    addProject({ 
        title: 'Centralized Logging Infrastructure (ELK Stack)', 
        desc: 'Designed and implemented an ELK Stack solution to centralize logs from 50+ production servers, reducing troubleshooting time by 40%.' 
    });

    addAchievement({
        title: 'Employee of the Quarter (Q3 2024)',
        desc: 'Recognized for excellent performance and dedication towards infrastructure stability.'
    });

    addVolunteer({
        title: 'Tech Mentor, Local IT Bootcamp',
        date: '2022 - Present'
    });

    addReference({
        name: 'John Doe',
        title: 'Senior DevOps Manager, eSewa Ltd.',
        contact: 'john.doe@esewa.com.np'
    });

    addEducation({
        date: '2015 — 2020',
        location: 'Kathmandu',
        title: 'Bachelor of Information and Technology, College of Information Technology and Engineering'
    });

    addCourse({
        date: 'Aug 2025 — Nov 2025',
        title: 'AWS Associate Solution Architecture',
        inst: 'Broadway infosys'
    });
}

// Word Document Download Logic
function downloadDocx() {
    const resumeEl = document.getElementById('resume-preview');
    const htmlExport = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="utf-8">
            <title>Resume</title>
            <style>
                @page { size: A4; margin: 1in; }
                body { font-family: 'Arial', sans-serif; font-size: 11pt; color: #1a1a1a; line-height: 1.4; }
                h1 { font-size: 18pt; margin-bottom: 5pt; text-align: center; }
                .resume-header { text-align: center; margin-bottom: 20pt; }
                .contact-info { font-size: 9pt; color: #333; text-align: center; margin-bottom: 5pt; }
                .social-links { font-size: 9pt; font-weight: bold; text-align: center; margin-bottom: 10pt; }
                .resume-section { display: block; margin-bottom: 15pt; border-top: 2pt solid #999; padding-top: 5pt; }
                .section-label { font-size: 9pt; font-weight: bold; color: #000; margin-bottom: 5pt; text-transform: uppercase; }
                .resume-item { display: block; margin-bottom: 10pt; }
                .item-header { font-weight: bold; font-size: 10pt; }
                .item-location { font-style: italic; font-size: 9pt; }
                .item-date { font-weight: bold; font-size: 9pt; }
                .item-details-bullets { margin-left: 20pt; padding-left: 0; }
                .item-details-bullets li { margin-bottom: 3pt; }
                .skills-grid { display: block; }
                .skill-category { margin-bottom: 5pt; }
                .skill-name { font-weight: bold; }
                .project-item { margin-bottom: 10pt; }
                .project-title { font-weight: bold; }
                .project-desc { font-size: 10pt; }
            </style>
        </head>
        <body>
            ${resumeEl.innerHTML}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlExport], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resume.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// PDF Download
document.getElementById('download-btn').addEventListener('click', () => {
    const element = document.getElementById('resume-preview');
    const opt = {
        margin: [10, 0],
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// DOCX Download Event
document.getElementById('download-docx-btn').addEventListener('click', downloadDocx);

// Reset
document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset everything?')) {
        const form = document.getElementById('resume-form');
        if (form) form.reset();
        Object.values(lists).forEach(list => {
            if (list) list.innerHTML = '';
        });
        loadInitialData();
        updatePreview();
    }
});

// Initial Setup
loadInitialData();
updatePreview();

// Global listeners for static fields
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});
