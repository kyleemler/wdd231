// Course Management and Display

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize course display
    displayCourses(courses);
    updateCreditsTotal(courses);

    // Set up filter buttons
    const allCoursesBtn = document.getElementById('all-courses');
    const wddCoursesBtn = document.getElementById('wdd-courses');
    const cseCoursesBtn = document.getElementById('cse-courses');

    allCoursesBtn.addEventListener('click', function () {
        currentFilter = 'all';
        updateActiveButton(this);
        displayCourses(courses);
        updateCreditsTotal(courses);
    });

    wddCoursesBtn.addEventListener('click', function () {
        currentFilter = 'wdd';
        updateActiveButton(this);
        const filtered = courses.filter(course => course.subject === 'WDD');
        displayCourses(filtered);
        updateCreditsTotal(filtered);
    });

    cseCoursesBtn.addEventListener('click', function () {
        currentFilter = 'cse';
        updateActiveButton(this);
        const filtered = courses.filter(course => course.subject === 'CSE');
        displayCourses(filtered);
        updateCreditsTotal(filtered);
    });
});

function displayCourses(coursesToDisplay) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    if (coursesToDisplay.length === 0) {
        container.innerHTML = '<p>No courses found.</p>';
        return;
    }

    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;

        const courseCode = `${course.subject} ${course.number}`;
        const completedBadge = course.completed
            ? '<span class="course-completed-badge">✓ Completed</span>'
            : '';

        const techList = course.technology.join(', ');

        courseCard.innerHTML = `
            <h3>${courseCode}</h3>
            <p>${course.title}</p>
            <p class="course-description">${course.description}</p>
            <p class="course-technology"><strong>Technologies:</strong> ${techList}</p>
            <div class="course-credits">${course.credits} Credits</div>
            ${completedBadge}
        `;

        container.appendChild(courseCard);
    });
}

function updateCreditsTotal(coursesToCount) {
    const totalCredits = coursesToCount.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

function updateActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}
