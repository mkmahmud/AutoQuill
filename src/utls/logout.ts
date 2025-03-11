

export const handleLogOut = async () => {
    let token = localStorage.getItem("token");

    if (!token) return;

    // Remove "bearer " prefix if it exists
    if (token.startsWith("bearer ")) {
        token = token.replace("bearer ", "").trim();
    }

    await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Logout successful");
                localStorage.removeItem("token");
                window.location.href = "/";

            } else {
                console.error("Logout failed:", data.error);
            }
        })
        .catch(error => console.error("Error during logout:", error));
};