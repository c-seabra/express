export default (copyMe: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = copyMe;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};
