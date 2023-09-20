let url = `http://localhost:3000`;

const upload = async (e) => {
  try {
    var files = e.target.files[0];
    var formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "c5pd1eoj");
    var xhr = new XMLHttpRequest();
    xhr.onload = async function () {
      let res = JSON.parse(this.responseText);
      await add(res.secure_url);
    };
    xhr.open("post", "https://api.cloudinary.com/v1_1/deyo5qknm/image/upload");
    xhr.send(formData);
  } catch (error) {
    alert(error);
  }
};

const add = async (img_link) => {
  try {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var baseprice = document.getElementById("baseprice").value;
    var minInc = document.getElementById("minInc").value;
    var img = [img_link];
    var proof = [];
    var proof = [];
    let user = localStorage.getItem("user_data");
    user = JSON.parse(user);
    const data = {
      email: user.user.email,
      name: name,
      basePrice: Number(baseprice),
      img: img,
      minInc: Number(minInc),
      desc: desc,
      category: ["collectibles & art", "electronics"],
      proof: proof, //img and proof are in array format
    };
    const res = await fetch(`${url}/api/item/createitem`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-rerer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    var user_data = await Promise.resolve(res.json());
    if (res.status == 200) {
      alert("Item added Successfully");
      location.href = "http://localhost:5500/frontend/profile/profile.html";
    } else {
      alert(user_data.msg);
    }
  } catch (error) {
    alert(error);
  }
};
