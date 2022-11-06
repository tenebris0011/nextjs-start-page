export default function search(event) {
    event.preventDefault();
    const textEntry = document.querySelector("#searchTerm").value;
    const searchTerm = textEntry.split(":")[1];
    const searchEngine = textEntry.split(":")[0];
    if (searchEngine === "g") {
        let searchURL = "https://www.google.com/search?q=".concat(searchTerm);
        window.open(searchURL, '_blank');
    } else if (searchEngine === "s") {
        let searchURL = "https://stackoverflow.com/search?q=".concat(searchTerm);
        window.open(searchURL, '_blank')
    } else {
        let defaultSearchTerm =  document.querySelector("#searchTerm").value;
        let searchURL = "https://www.google.com/search?q=".concat(defaultSearchTerm);
        window.open(searchURL, '_blank')
    }

    document.querySelector("#searchTerm").value = null;
}