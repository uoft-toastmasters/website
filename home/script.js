document.addEventListener('DOMContentLoaded', () => {
    const handleScrollAnimations = () => {
        const sections = document.querySelectorAll('.about-us, .welcome');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                section.classList.add('animate');
            } else {
                section.classList.remove('animate');
            }
        });
    };


    handleScrollAnimations();

    window.addEventListener('scroll', handleScrollAnimations);

    const execBlocks = document.querySelectorAll('.exec');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    execBlocks.forEach(block => {
        observer.observe(block);
    });
});


emailjs.init("WH-V2BwtIDjbOlXbh"); 

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

        emailjs.sendForm('service_c9w140y', 'template_eti9zdf', this)
            .then(function(response) {
                alert('Email sent successfully!');
                document.getElementById('contact-form').reset();
            }, function(error) {
                alert('Error sending email: ' + JSON.stringify(error));
            });
    });