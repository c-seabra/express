export const upperWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Shorten string with length greater than limit
 * eg. abc...xyz
 * @param text - the text to shorten
 * @param lengthLimit - how many characters to keep
 */
export const shortenString = (text: string, lengthLimit = 15): string => {
  if (text.length > lengthLimit) {
    const halfLimit = Math.round(lengthLimit / 2);
    return `${text.substr(0, halfLimit)}...${text.substr(-halfLimit)}`;
  }

  return text;
};
