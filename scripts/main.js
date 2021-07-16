const topOffset = 120;
const phone = '+380965235134';

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

function test() {
    const form = document.getElementById('email-form');

    if (form)
        form.submit();
}