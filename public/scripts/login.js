const selector = document.querySelector("#login")

selector.addEventListener("click", async (event) => {
    try {
        event.preventDefault()

        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/login", options)
        response = await response.json()
        alert(response.message)

        if (response.message.toLowerCase().includes("logged")) {
            // Redirige a la página de login
            window.location.href = "index.html";
        }
    } catch (error) {
        alert(error.message)
    }
})