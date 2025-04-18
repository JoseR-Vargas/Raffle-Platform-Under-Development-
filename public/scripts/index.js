const url = "http://localhost:9000/api/sessions/online"
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
}
async function verifyOnline() {
    let response = await fetch(url, opts)
    response = await response.json()
    const { online } = response
    if (online) {
        document.querySelector("#navbar").innerHTML = 
        `<li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>`
    }
}
verifyOnline();
