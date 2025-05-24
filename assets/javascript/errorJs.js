const container = document.querySelector('.registerListenerEmailBox');
const input = container.querySelector('input');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(input.value)) {
  container.classList.add('error');
} else {
  container.classList.remove('error');
}
