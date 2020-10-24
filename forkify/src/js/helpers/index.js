/**
 * Gets passed title limited by given limit.
 * @param {string} title 
 * @param {number} limit 
 */
const getLimitedTitle = (title, limit = 17) => {

  if (title.length > limit) {
    const newTitle = [];
    const wordsAmount = title.split(' ').length;

    title.split(' ').reduce((totalLength, word) => {
      if (totalLength + word.length <= limit) {
        newTitle.push(word);
      }

      return totalLength + word.length;
    }, 0)

    if (wordsAmount !== newTitle.length) {
      return `${newTitle.join(' ')}...`;
    }

  }

  return title;
}

export { getLimitedTitle };