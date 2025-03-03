const tagsContainer = document.getElementById('tags');
const textarea = document.querySelector('.text-input');
const messageContainer = document.querySelector('.message');
const tagArray = [];
const resetButton = document.querySelector('.reset');
const randomButton = document.querySelector('button.randomise');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
  const tagArray = createTags(e.target.value);
    // TODO - wire up a submit button as well as Enter key
    setTimeout(() => {
      e.target.value = ''; // TODO - instead of clearing here, we could enter the searches into a list to be recalled later
    }, 10);

		applyTag(tagArray);


    // const tags = document.querySelectorAll('.tag'); // get a nodelist of tags and then count them
    // if (tags.length > 1) {
    //   randomSelect();
    // } else {
    //   alert('Please enter more than one tag');
    // }
  }
});

// TODO - this part could be done better and maybe with a submit button
const createTags = (input) => {
  const tags = input
    .split(',') //This takes a string input and splits it into an array at each comma.
    .filter((tag) => tag.trim() !== '') //  removes whitespace from both ends of each string &  checks if the trimmed string is not empty
    .map((tag) => tag.trim()); //creates a new array where each element has whitespace removed from both ends:
		tagArray.push(tags);
		return tagArray;
};

const applyTag = (tags) => {
	tagsContainer.innerHTML = '';
  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsContainer.appendChild(tagEl);
    messageContainer.classList.add('hidden');
  });
}






// TODO - we want code that will count the number of tags and show the random button when there are more than one tag
const checkTagsLength = (tags) => {
  if (tags.length > 1) {
    alert('Please enter less than 10 tags');
    tagsContainer.textContent = "";
  }
}


const randomSelect = () => {
  const times = 30;
  const time = 100;

  const tags = tagsContainer.querySelectorAll('.tag');

  if (tags.length <= 1) {
    alert('Please enter more than one tag, sucka');
    return;
  }



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
			resetButton.addEventListener('click', () => {
				resetTags(tags);
			});
    }, time); // Small delay to ensure DOM update
  }, times * time);
};

const pickRandomTag = () => {
  const tags = document.querySelectorAll('.tag');
  if (tags.length > 0) {
    return tags[Math.floor(Math.random() * tags.length)];
  } else {
    alert('Please enter more than one tag');
  }
};

const highLightTag = (tag) => {
  tag.classList.add('highlight');
};

const unhighLightTag = (tag) => {
  tag.classList.remove('highlight');
};


//TODO -- reset is still notr working correctly, I think we are reinstating the tags when we submit a new set
const resetTags = (tags) => {
	tagsContainer.innerHTML = "";
	messageContainer.classList.add('hidden');
}

randomButton.addEventListener('click', randomSelect);


//TODO now we have a button involved, the state of the page is a bit messed up, so we need to organise how we clean up.
