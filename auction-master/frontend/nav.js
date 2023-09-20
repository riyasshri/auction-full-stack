async function loadnav() {
  var ele = document.getElementById("nav_inject");
  var stat = localStorage.getItem("user_data");
  if (stat) {
    ele.innerHTML = `
    <a href="/frontend/home/index.html" style="float: left">
      <img class="logo" src="../img/logo.jpg" alt="logo" height="70" width="70" />
    </a>
    <form id="form" onsubmit="return false">
    <input id="query"/>
      <button onclick="search()" class="search">GO</button>
    </form>
    <div class="navbar">  
    <a href="" onclick="logout()">
        <button>Logout</button>
      </a>  
    <a href="/frontend/profile/profile.html">
        <button>Profile</button>
      </a>
      <a href="/frontend/add/add.html">
        <button href="">Add item</button>
      </a>
    </div>
  `;
  } else {
    ele.innerHTML = `
    <a href="/frontend/home/index.html" style="float: left">
      <img class="logo" src="../img/logo.jpg" alt="logo" height="70" width="70" />
    </a>
    <form id="form" onsubmit="return false">
    <input id="query" />
      <button onclick="search()" class="search">GO</button>
    </form>
    <div class="navbar">
      <a href="login/login.html">
        <button>Login</button>
      </a>
      <a href="signup/signup.html">
        <button href="">Sign up</button>
      </a>
      <a href="about/about.html">
        <button href="">About</button>
      </a>
    </div>
  `;
  }
}

const search = async () => {
  var search_query = document.getElementById("query").value;
  if (search_query.length <= 0) {
    alert("Empty Seach Query");
    return false;
  }
  location.href = `http://localhost:5500/frontend/result/result.html?search_query=${search_query}`;
  return false;
};

const verify_nav = async () => {
  var user_data = localStorage.getItem("user_data");
  if (!user_data) {
    location.href = `http://localhost:5500/frontend/login/login.html`;
  }
  return;
};

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    location.href = `http://localhost:5500/frontend/login/login.html`;
  } catch (error) {
    alert(error);
  }
};
