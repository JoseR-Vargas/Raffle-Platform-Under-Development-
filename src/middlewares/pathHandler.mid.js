function patHandler(req, res, next) {
    const message = `${req.method} ${req.url} - ENDPOINT NOT FOUND`;
    res.status(404).json({ error: message });
};

export default patHandler;