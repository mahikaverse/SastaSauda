
  /* ✅ IMAGE SLIDER */
  const images = [
    "https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables.jpg",
    "https://medicaldialogues.in/h-upload/2022/09/17/750x450_185765-dairy-products.webp",
    "https://distillique.co.za/cdn/shop/files/Untitled_design_13_1024x1024.webp",
    "https://5.imimg.com/data5/SELLER/Default/2020/11/YU/DZ/HH/108920876/whole-spices-khade-masale.jpg",
    "https://connect.healthkart.com/wp-content/uploads/2016/08/banner-56.jpg",
    "https://www.kronen.eu/fileadmin/_processed_/7/5/csm_meat-fish-kronen-processing-machines_shutterstock_1920px_6ea5045a6e.jpg"
  ];
  let current = 0;
  const heroImage = document.getElementById("heroImage");
  setInterval(() => {
    heroImage.classList.add("opacity-0");
    setTimeout(() => {
      current = (current + 1) % images.length;
      heroImage.src = images[current];
      heroImage.classList.remove("opacity-0");
    }, 1000);
  }, 4000);

  /* ✅ MANDI PRICE BOARD */
  const priceData = [
    { item: 'Tomatoes', price: 20, freshness: '5hrs ago' },
    { item: 'Potatoes', price: 22, freshness: '4hrs ago' },
    { item: 'Onions', price: 20, freshness: 'Yesterday stock' },
  ];

  function updatePriceBoard() {
    const tableBody = document.getElementById('price-board-body');
    tableBody.innerHTML = '';

    priceData.forEach(data => {
      const row = document.createElement('tr');
      row.classList.add('border-b');

      row.innerHTML = `
        <td class="px-4 py-2 text-green-700">${data.item}</td>
        <td class="px-4 py-2 text-green-700">₹${data.price} /kg</td>
        <td class="px-4 py-2 text-green-700">${data.freshness}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function refreshPriceBoard() {
    priceData.forEach(item => {
      item.freshness = 'Updated just now ✅';
      item.price = Math.floor(Math.random() * 20) + 15;
    });
    updatePriceBoard();
  }

  /* ✅ PRODUCT SEARCH BACKEND INTEGRATION */
  const searchInput = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");

  async function fetchSearchResults(query) {
    if (!query) {
      suggestions.classList.add("hidden");
      return;
    }

    try {
      const response = await fetch(`/products/search/?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      suggestions.innerHTML = "";

      if (data.results.length > 0) {
        data.results.forEach(product => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="flex items-center gap-2">
              <img src="${product.image_url || 'https://via.placeholder.com/40'}" class="w-8 h-8 rounded" />
              <div>
                <strong>${product.name}</strong>
                <p class="text-xs text-gray-500">₹${product.price} | Stock: ${product.stock}</p>
              </div>
            </div>
          `;
          li.className = "px-2 py-2 hover:bg-green-100 cursor-pointer";

          // Click → redirect to detail page
          li.addEventListener("click", () => {
            window.location.href = `/products/detail/${encodeURIComponent(product.name)}/`;
          });

          suggestions.appendChild(li);
        });
        suggestions.classList.remove("hidden");
      } else {
        suggestions.innerHTML = `<li class="px-2 py-1 text-gray-500">No products found</li>`;
        suggestions.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  // Fetch suggestions as user types
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    fetchSearchResults(query);
  });

  // Press Enter -> run search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      fetchSearchResults(searchInput.value.trim());
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#searchInput") && !e.target.closest("#suggestions")) {
      suggestions.classList.add("hidden");
    }
  });

  // Initialize price board on page load
  window.onload = updatePriceBoard;

