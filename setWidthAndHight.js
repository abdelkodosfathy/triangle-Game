setHeightAndWidth = () => {
    const currentHeight = window.innerHeight, 
    currentWidth = window.innerWidth;
    document.body.style.height = `${currentHeight}px`;
    document.body.style.width = `${currentWidth}px`;
}

window.addEventListener("resize", setHeightAndWidth);
setHeightAndWidth();