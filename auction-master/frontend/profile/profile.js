let url = `http://localhost:3000`;
let main_user;
const getUser = async () => {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  const user_id = user_data.user._id;
  if (user_id) {
    var res = await fetch(`${url}/api/user/getuser/${user_id}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    main_user = await Promise.resolve(res.json());
    main_user = main_user.user;
    document.cookie = `main_user=${main_user};max-age=${1 * 60}`;
    return main_user;
  }
};

const verify = async () => {
  let main_user = await getUser();
  var cookie_user = document.cookie;
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  const listed = main_user.listed;
  document.getElementById("name").innerHTML =
    user_data.user.name + " " + user_data.user._id;
  document.getElementById("email").innerHTML = user_data.user.email;
  if (!user_data) {
    window.location.href = `http://localhost:5500/frontend/login/login.html`;
  }
  listed.map(async (e) => {
    var item = await fetch(`${url}/api/item/getitem/${e}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    item = await Promise.resolve(item.json());
    var itemo = item.item;
    var all_item = document.getElementById("all_item_auction");
    var item = document.createElement("div");
    item.className = "item";
    if (itemo.status == "live" && itemo.heldBy) {
      item.innerHTML = `<h4>${itemo?.name}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
      <button>View Item</button>
      </a>
      <a href="accept/accept.html?prod_id=${itemo._id}&user_id=${user_data.user._id}">
      <button>Accept Offer</button>
    </a>
    `;
    } else if (itemo.status == "live") {
      item.innerHTML = `<h4>${itemo?.name}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
      <button>View Item</button>
      </a>
      <p>Item not bid by any one</p>
    `;
    } else {
      item.innerHTML = `<h4>${itemo?.name}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
    <button>View Item</button>
    </a>
    <h3>SOLD</h3>
    `;
    }

    all_item.appendChild(item);
  });
  const heldItems = main_user.heldItems;
  heldItems.map(async (e) => {
    var item = await fetch(`${url}/api/item/getitem/${e}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    item = await Promise.resolve(item.json());
    var itemo = item.item;
    var all_item = document.getElementById("all_item_bid");
    var item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<h4>${itemo?.name}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
    <button>View Item</button>
    </a>
    
    `;
    all_item.appendChild(item);
  });
};

function name() {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  document.getElementById("username").innerHTML = user_data.user.email;
}
