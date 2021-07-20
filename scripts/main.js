const topOffset = 120;
const phone = '+380965235134';
const imageName = 'slide-image-';
const regex = /slide\d+/i;

let tempImage;

(function(window, document, undefined){
    // code that should be taken care of right away
    
    window.onload = init;
    
      function init(){
        // the code to be called when the dom has loaded

        listenForm();
        generateSlider();
      }
    
    })(window, document, undefined);


function moveTo(name) {

    const element = document.getElementById(name);
    const top = element.offsetTop - topOffset;

    if (top > 0)
        window.scrollTo(0, top);
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

    const imageId = getImageId(e);
    const modalElement = document.getElementById('modal');

    if (imageId && modalElement) {

        const imageElement = document.getElementById(imageId);
        modalElement.style.display = 'block';
        tempImage = document.createElement('img');
        tempImage.src = imageElement.src;
        const modalContentElement = document.getElementById('modal-content');

        if (modalContentElement)
            modalContentElement.appendChild(tempImage);
    }
}

function getImageId(sliderElement) {

    const id = sliderElement?.slide?.id;

    if (id) {

        const matches = id.match(regex);

        if (matches && matches.length > 0) {

            const parsedId =  Number.parseInt(matches[0].match(/\d+/));
            return parsedId ? `${imageName + parsedId}` : null;
        }
    }
}

function closeModal() {

    const modalElement = document.getElementById('modal');

    if (modal)
        modalElement.style.display = 'none';

    if (tempImage)
        tempImage.remove();
}