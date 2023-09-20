let url = `http://localhost:3000`;
const login = async () => {
  const username = document.getElementById("Uname").value;
  const password = document.getElementById("Pass").value;


  const data = {
    email: username,
    password: password,
  };
  const res = await fetch(`${url}/api/auth/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  var user_data = await Promise.resolve(res.json());
  if (res.status == 200) {
    user_data = JSON.stringify(user_data);
    localStorage.setItem("user_data", user_data);
    window.location.href = `http://localhost:5500/frontend/profile/profile.html`;
  } else {
    alert(user_data.msg);
  }
};

const verify = async () => {
  var user_data = localStorage.getItem("user_data");
  if (user_data) {
    user_data = JSON.parse(user_data);
    window.location.href = `http://localhost:5500/frontend/profile/profile.html`;
  }
};
