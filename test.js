async function fetchData() {
  try {
    const response = await fetch(
      "https://po9c2cgj.api.sanity.io/v2025-09-23/data/query/production?query=*%5B_type+%3D%3D+%22exercise%22%5D%7B%0A++...%0A++%7D&perspective=drafts"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse JSON
    console.log(data); // Log data to console
  } catch (error) {
    console.error("Error:", error); // Log any errors
  }
}

// Call the function
fetchData();
