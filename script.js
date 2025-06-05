document.addEventListener('DOMContentLoaded', function() {

     // --- Theme Toggle Functionality ---
     const themeToggle = document.getElementById('theme-toggle');
     const body = document.body;
     const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.758a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>`;
     const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-3.815 2.04-7.174 5.168-8.97a.75.75 0 01.819.162z" clip-rule="evenodd" /></svg>`;
     let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

     function applyTheme(theme) {
         if (theme === 'light') {
             body.classList.add('light-theme');
             themeToggle.innerHTML = moonIcon;
             localStorage.setItem('theme', 'light');
         } else {
             body.classList.remove('light-theme');
             themeToggle.innerHTML = sunIcon;
             localStorage.setItem('theme', 'dark');
         }
         currentTheme = theme;
     }
     themeToggle.addEventListener('click', () => { applyTheme(currentTheme === 'light' ? 'dark' : 'light'); });
     applyTheme(currentTheme);

     // --- Collapsible Section Functionality ---
     const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
     collapsibleTriggers.forEach(trigger => { const card = trigger.closest('.card'); const content = card ? card.querySelector('.collapsible-content') : null; if (content) { trigger.addEventListener('click', function(e) { if (e.target.tagName === 'A') { return; } this.classList.toggle('active'); if (content.style.maxHeight && content.style.maxHeight !== '0px') { content.style.maxHeight = '0px'; } else { content.style.maxHeight = content.scrollHeight + "px"; } }); } });

    // --- Scroll Animation Functionality ---
     const fadeElements = document.querySelectorAll('.fade-in-section');
     const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
     const observer = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, observerOptions);
     fadeElements.forEach(el => { observer.observe(el); });

     // --- Update Copyright Year ---
     const yearSpan = document.getElementById('copyright-year');
     if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

     // --- Typing Animation Functionality ---
    const typingElement = document.getElementById('typing-animation');
    if (typingElement) {
        const roles = ["Machine Learning Engineer", "Data Analyst", "Full Stack Developer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100; // Speed of typing
        const deletingSpeed = 50; // Speed of deleting
        const delayBetweenRoles = 1500; // Pause after typing a role
        const delayAfterDeleting = 300; // Pause after deleting before typing next

        function typeRole() {
            const currentRole = roles[roleIndex];
            let displayText = '';

            if (isDeleting) {
                // Deleting
                displayText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing
                displayText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = displayText;

            if (!isDeleting && charIndex === currentRole.length) {
                // Finished typing current role
                isDeleting = true;
                setTimeout(typeRole, delayBetweenRoles); // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting current role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next role
                setTimeout(typeRole, delayAfterDeleting); // Pause before typing next role
            } else {
                // Continue typing or deleting
                setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
            }
        }
        // Start the animation
        setTimeout(typeRole, delayBetweenRoles);
    }

});
