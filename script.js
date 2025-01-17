// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

// Theme toggler
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.innerHTML = body.dataset.theme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
  updateChartColors();
});

// Skill Chart
const ctx = document.getElementById('skillChart').getContext('2d');
let skillChart;

function getChartColors() {
  const isDark = body.dataset.theme === 'dark';
  return {
    backgroundColor: isDark ? 'rgba(33, 150, 243, 0.2)' : 'rgba(33, 150, 243, 0.1)',
    borderColor: '#2196f3',
    textColor: isDark ? '#fff' : '#333'
  };
}

function createChart() {
  const colors = getChartColors();
  
  skillChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Data Engineering',
        'Cloud Technologies',
        'ETL Development',
        'Big Data',
        'Data Modeling',
        'Visualization'
      ],
      datasets: [{
        label: 'Skills Proficiency',
        data: [95, 90, 95, 85, 88, 92],
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            color: colors.textColor
          },
          grid: {
            color: colors.textColor
          },
          pointLabels: {
            color: colors.textColor,
            font: {
              size: 12
            }
          },
          suggestedMin: 50,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colors.textColor
          }
        }
      }
    }
  });
}

function updateChartColors() {
  if (skillChart) {
    skillChart.destroy();
  }
  createChart();
}

createChart();

// Experience cards interaction
const experienceCards = document.querySelectorAll('.experience-card');

experienceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    experienceCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// Profile Image Upload Handler
const profileUpload = document.getElementById('profile-upload');
const profileImage = document.querySelector('.profile-image');

profileUpload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      // Remove placeholder SVG if it exists
      const placeholder = profileImage.querySelector('svg');
      if (placeholder) {
        placeholder.remove();
      }
      // Remove existing image if it exists
      const existingImg = profileImage.querySelector('img');
      if (existingImg) {
        existingImg.remove();
      }
      profileImage.insertBefore(img, profileImage.firstChild);
    }
    reader.readAsDataURL(file);
  }
});

// Form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  console.log('Form submitted:', { name, email, message });
  
  contactForm.reset();
  
  alert('Thank you for your message! I will get back to you soon.');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Active navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});