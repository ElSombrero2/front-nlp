const toggle = () => {
    const modal = document.getElementById('modal')
    if(modal.classList.contains('is-active')) modal.classList.remove('is-active')
    else modal.classList.add('is-active')
}

document.querySelectorAll('.modal-toggle').forEach((el) => {
    el.addEventListener('click', () => toggle())
})