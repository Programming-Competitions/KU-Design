let nav = `<nav
      class="flex items-center justify-between flex-wrap bg-black p-6"
    >
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a href="index.html"
          ><span class="font-semibold text-4xl tracking-tight"
            >Tasklist</span
          ></a
        >
      </div>
      <div class="text-sm lg:flex-grow">
        <a
          href="demo.html"
          class="block mt-4 lg:inline-block lg:mt-0 text-white"
        >
          Demo
        </a>
      </div>
      <div>
        <button
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
          id="login-btn"
        >
          Login
        </button>
        <button
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
          id="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>`;

document.getElementById("nav-top").innerHTML=nav
