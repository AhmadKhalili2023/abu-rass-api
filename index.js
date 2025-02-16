export default {
    async fetch(request) {
      const veloeatMenuUrl = "https://www.veloeatmerchant.com/ordering/restaurant/menu?restaurant_uid=a565337c-ea69-4d6e-a70a-0cf8672a1554";
  
      const response = await fetch(veloeatMenuUrl, {
        headers: { "User-Agent": "Mozilla/5.0" }, // Some sites block bots; this helps bypass that
      });
  
      const html = await response.text();
  
      // Use DOMParser to parse the HTML response
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
  
      // Adjust these selectors based on the actual HTML structure
      let menuItems = [...doc.querySelectorAll(".menu-item-name")]
        .map(el => el.textContent.trim());
  
      if (menuItems.length === 0) menuItems = ["Menu not found"];
  
      return new Response(
        JSON.stringify({ menu: menuItems }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  };
  