function getPathFromUrl(url) {
    return url.split("?")[0];
}

module.exports = (req, res, next) => {
    res.locals.env = process.env.ENVIRONMENT;
    res.locals.site_url = process.env.SITE_URL;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    next();
}