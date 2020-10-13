const first = () => {
  console.log('Hey there');
  second();
  console.log('The end');
}

const second = () => {
  setTimeout(() => {
    console.log('async');
  }, 2000);
}

first();