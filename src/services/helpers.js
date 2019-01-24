export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getServerError = (names) =>
  sleep(1000).then(() =>
    names.reduce((errors, name) => {
        errors[name] = `Incorrect ${name}`;
        return errors;
    }, {})
  );
