import cheerio from "cheerio";

export default {
  async fetch(request) {
    const url = "https://aburassrestaurant.com/";
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Adjust these selectors based on actual HTML structure
    let menuItems = $(".menu-list li")
      .map((i, el) => $(el).text().trim())
      .get();

    let hours = $(".business-hours")
      .map((i, el) => $(el).text().trim())
      .get();

    if (menuItems.length === 0) menuItems = ["Menu not found"];
    if (hours.length === 0) hours = ["Hours not available"];

    return new Response(
      JSON.stringify({ menu: menuItems, hours: hours }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};
