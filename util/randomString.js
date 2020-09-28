const randomString = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i <= 5; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }
  return string;
};

export default randomString;
