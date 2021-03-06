const constants  = import('./constants.js');

const topOffset = 120;
const imageName = 'slide-image-';
const regex = /slide\d+/i;

let isBurgerShown = false;
let tempImage;
let phone, photos, noImage;

(function(window, document, undefined){
    // code that should be taken care of right away
    
    window.onload = init;
    
      function init(){
        // the code to be called when the dom has loaded

        constants.then(e => {
            phone = e.phone,
            photos = e.slider,
            noImage = e.noImage
        });

        listenForm();
        generateSlider();
        hideBurgerMenu();
      }
    
    })(window, document, undefined);

function hideBurgerMenu() {

    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById('burger').style.top = "0";
        } else {
            document.getElementById('burger').style.top = "-80px";
        }
        prevScrollpos = currentScrollPos;
    }
}

function moveTo(name) {

    const element = document.getElementById(name);
    const top = element.offsetTop - topOffset;
    window.scrollTo(0, top > 0 ? top : 0);
}

function dial() {

    const element = document.createElement('a');
    element.setAttribute('href', `tel:${phone}`);
    element.click();
}

function submit() {

    const form = document.getElementById('email-form');

    if (form)
        form.submit();
}

function listenForm() {

    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('email-form');
    const name = form.elements['form-name'];
    const tel = form.elements['form-tel'];

    name.addEventListener('input', (event) => {

        if (submitBtn)
            checkElement(submitBtn);
    });

    tel.addEventListener('input', (event) => {

        if (submitBtn)
            checkElement(submitBtn);
    });
}

function checkForm() {

    const nameInput = document.getElementById('form-name');
    const telInput = document.getElementById('form-tel');

    if (nameInput && telInput) {

        if (nameInput.validity.valid && telInput.validity.valid)
            return true;
    }

    return false;
}

function checkElement(element) {

    if (checkForm())
        element.disabled = false;
    else
        element.disabled = true;
}

function generateSlider() {
    
    const slider = new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: 10,
        rewind: true,
        cover: true,
    }).mount();

    slider.on('click', (e) => zoomPicture(e));
}

function zoomPicture(e) {

    const imageId = e?.slide?.children[0]?.children[0]?.id;
    const modalElement = document.getElementById('modal');

    if (imageId && modalElement) {

        modalElement.style.display = 'block';
        tempImage = document.createElement('img');
        let originalPhoto = photos.find(e => e.id === imageId);
        tempImage.src = originalPhoto ? originalPhoto.path : noImage;
        const modalContentElement = document.getElementById('modal-content');

        if (modalContentElement)
            modalContentElement.appendChild(tempImage);
    }
}

function closeModal() {

    const modalElement = document.getElementById('modal');

    if (modal)
        modalElement.style.display = 'none';

    if (tempImage)
        tempImage.remove();
}

function collapseMenu() {

    const burgerMenuElement = document.getElementById('burger-menu');

    if (burgerMenuElement) {
        
        if (isBurgerShown) {
            burgerMenuElement.style.top = '-1000px';
        }
        else {
            burgerMenuElement.style.top = '0px';
        }

        isBurgerShown = !isBurgerShown;
    }
}