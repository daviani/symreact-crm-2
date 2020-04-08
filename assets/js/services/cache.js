const cache = {};

function set (key, data) {
    cache[key] = {
        data,
        cachedAt: new Date().getTime()
    };
}

function get (key) {
    return new Promise((resolve) => {
        resolve(
            //Si il y a une donnée dans le cache, on vérifie le moment ou cela à été mis en cache
            cache[key] && cache[key].cachedAt + 10 * 60 * 1000 > new Date().getTime()
                ? cache[key].data
                : null
        );
    });

}

export default {
    set,
    get
};