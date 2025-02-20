const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const messageContainer = document.querySelector('.message');
const tagArray = [];
const resetButton = document.querySelector('.reset');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    // TODO - wire up a submit button as well as Enter key
    setTimeout(() => {
      e.target.value = ''; // TODO - instead of clearing here, we could enter the searches into a list to be recalled later
    }, 10);

    const tags = document.querySelectorAll('.tag'); // get a nodelist of tags and then count them
    if (tags.length > 1) {
      randomSelect();
    } else {
      alert('Please enter more than one tag');
    }
  }
});

// TODO - this part could be done better and maybe with a submit button
const createTags = (input) => {
  const tags = input
    .split(',') //This takes a string input and splits it into an array at each comma.
    .filter((tag) => tag.trim() !== '') //  removes whitespace from both ends of each string &  checks if the trimmed string is not empty
    .map((tag) => tag.trim()); //creates a new array where each element has whitespace removed from both ends:

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

    setTimeout(() => {
      const winner = document.querySelector('.tag.highlight').innerHTML;
      messageContainer.querySelector('.winner').innerHTML = winner;
      messageContainer.classList.remove('hidden');
			resetButton.addEventListener('click', resetTags);
    }, time); // Small delay to ensure DOM update
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

const resetTags = () => {
	tagsEl.textContent = "";
	messageContainer.classList.add('hidden');
}

randomButton.addEventListener('click', randomSelect);


//TODO now we have a button involved, the state of the page is a bit messed up, so we need to organise how we clean up.
