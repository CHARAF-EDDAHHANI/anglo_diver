export const fetchSessions = async () => {
    const res = await fetch("http://localhost:5000/api/sessions");
    if(!res.ok) throw new Error("Failed to fetch sessions");
    return res.json();
};

export const createSession = async (sessionData) => {
    const res = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(sessionData),
    });
    if(!res.ok) throw new Error("Failed to create session");
    return res.json();
};