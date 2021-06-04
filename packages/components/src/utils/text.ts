export const upperWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Shorten string with length greater than limit
 * eg. abc...xyz
 * @param elem
 * @param lengthLimit
 */
export const shortenString = (elem: string, lengthLimit = 15): string => {
  if (elem.length > lengthLimit) {
    const halfLimit = Math.round(lengthLimit / 2);
    return `${elem.substr(0, halfLimit)}...${elem.substr(-halfLimit)}`;
  }

  return elem;
};
