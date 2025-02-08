const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const messageContainer = document.querySelector('.message');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    // TODO - wire up a submit button as well as Enter key
    setTimeout(() => {
      e.target.value = ''; // TODO - instead of clearing here, we could enter the searches into a list to be recalled later
    }, 10);

    randomSelect();
  }
});

const createTags = (input) => {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());

  tagsEl.innerHTML = '';
  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
};

const randomSelect = () => {
  const times = 30;
  const time = 100;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highLightTag(randomTag);

    setTimeout(() => {
      unhighLightTag(randomTag);
    }, time);
  }, time);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highLightTag(randomTag);
    }, time);

		const winner = document.querySelector('.tag.highlight').innerHTML;
		messageContainer.querySelector('.winner').innerHTML += winner;
		messageContainer.classList.remove('hidden');

		// TODO reset this message as it only works on first time run through


  }, times * time);
};

const pickRandomTag = () => {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
};

const highLightTag = (tag) => {
  tag.classList.add('highlight');
};

const unhighLightTag = (tag) => {
  tag.classList.remove('highlight');
};
