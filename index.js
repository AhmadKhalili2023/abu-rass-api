export default {
    async fetch(request) {
      const url = "https://aburassrestaurant.com/";
      const response = await fetch(url);
      const text = await response.text();
  
      // Extract menu items and hours (Modify as needed)
      const menuMatches = text.match(/<li class="menu-item">(.*?)<\/li>/g);
      const hoursMatch = text.match(/<p class="hours">(.*?)<\/p>/);
  
      let menuItems = menuMatches ? menuMatches.map(item => item.replace(/<.*?>/g, '')) : ["Menu not found"];
      let hours = hoursMatch ? hoursMatch[1] : ["Hours not available"];
  
      return new Response(JSON.stringify({ menu: menuItems, hours: hours }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  };
  