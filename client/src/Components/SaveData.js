const SaveData = (url, name, email, year, state, level) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      year: year,
      state: state,
      level: level
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong with saving user to database...");
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
};

export default SaveData;
