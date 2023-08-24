const addProjectSliderEvent = (element) => {
  element.addEventListener('mouseenter', (e) => {
    e.target.querySelector('.slider').classList.remove('sliderHidden');
    e.target.querySelector('.slider').classList.add('sliderShown');
  })

  element.addEventListener('mouseleave', (e) => {
    e.target.querySelector('.slider').classList.remove('sliderShown');
    e.target.querySelector('.slider').classList.add('sliderHidden');
  })
  return element
}

export default addProjectSliderEvent;