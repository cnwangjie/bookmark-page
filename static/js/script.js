let searchForm = document.getElementById('search-form')
let search = () => {
    if (searchForm.value) {
        window.location = `/search?q=${searchForm.value}`
    }
}
let enterSearch = (e) => {
    if (e.which == 13) {
        search()
    }
}
searchForm.onfocus = () => {
    document.addEventListener('keypress', enterSearch)
}
searchForm.onblur = () => {
    document.removeEventListener('keypress', enterSearch)
}
