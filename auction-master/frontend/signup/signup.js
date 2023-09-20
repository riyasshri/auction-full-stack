let url = `http://localhost:3000`;

const verify = async () => {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  if (user_data) {
    window.location.href = `http://localhost:5500/frontend/profile/profile.html`;
  }
};

const create = async () => {
  try {
    var pass = document.getElementById("Pass").value;
    var cpass = document.getElementById("CPass").value;

    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let regextest = regex.test(pass);
    if (regextest == false) {
      alert(
        "Password must be of length 6-20, contain atleast one uppercase, one lowercase, one number and one special character"
      );
      return false;
    }

    if (pass != cpass) {
      alert("Password not matching");
      return false;
    }
    const userObject = {
      name: document.getElementById("Uname").value,
      email: document.getElementById("Uemail").value,
      password: pass,
    };
    const res = await fetch(`${url}/api/auth/create`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(userObject), // body data type must match "Content-Type" header
    });
    var user_data = await Promise.resolve(res.json());
    if (user_data.status == "failure") {
      alert(user_data.msg);
    }
  } catch (error) {
    alert(error);
  }
};
