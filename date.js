
module.exports.getDate= function()
{
    const date = new Date();

    var options = { weekday: 'long', day: 'numeric', month: 'long',year: 'numeric'};

    return date.toLocaleDateString("en-US", options);

}

module.exports.getDay= function()
{
    const date = new Date();

    var options = { weekday: 'long'};

    return date.toLocaleDateString("en-US", options);

}