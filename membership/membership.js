document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".membership-block");


    function animateBlocks() {
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.classList.add("show");
            }, index * 300); 
        });
    }


    function isInView(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }


    function handleScroll() {
        if (blocks.length > 0 && isInView(blocks[0])) {
            animateBlocks();
            window.removeEventListener("scroll", handleScroll); 
        }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);
});
