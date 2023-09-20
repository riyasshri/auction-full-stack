let url = `http://localhost:3000`;
const find = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.search_query;
  var items = await fetch(`${url}/api/item/search/${value}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  items = await Promise.resolve(items.json());
  items = items.prods;
  var main_cotnainer = document.getElementById("product_grid");
  items.map((e) => {
    var item_container = document.createElement("div");
    item_container.innerHTML = `
    <div class="product">
    <img src="${e.img[0]}" alt="" width="140px" height="140px" />
    <div class="rest_data">
    <h3 class="title">${e.name}</h3>
    <div class="prices">
    <h3 class="cp">Current Price: $${e.currentPrice}</h3>
    <p class="bp">Base Price: $${e.basePrice}</p>
    </div>
    <div class="status" id="status">
    <p>${e.status}</p>
    <a href="/frontend/item/item.html?item_id=${e?._id}">
    <button>View</button>
    </a>
    </div>
        </div>
        </div>
        `;
    main_cotnainer.appendChild(item_container);
  });
  var stext = document.getElementById("search_text");
  stext.innerHTML = `Searching for "${value.toUpperCase()}"`;
};
