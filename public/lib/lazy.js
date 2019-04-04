const targets = document.querySelectorAll('.lazy');

const lazyLoad = target => {
    //entries: actual observation on the elem 
    //observer: interface to manage observer instance
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            //isIntersecting will return true or false
            //can do actual bounding box calcs too
            if(entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-lazy');
                
                img.setAttribute('src', src);
                //dispose of observer after img is loaded
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};

targets.forEach(lazyLoad);