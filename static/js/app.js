var get_people = function () {
    fetch('/people', { method: 'GET' })
        .then(function (response) { return response.json(); })
        .then(function (data) { return callback(data); })
        .catch(function (error) { return console.log(error); });
};
var callback = function (data) {
    console.log(data);
    document.getElementById('root').innerHTML
        = " <h1>First Name: ".concat(data.firstname, "</h1>\n            <p>Last Name: ").concat(data.lastname, "</p>\n            <p>Age: ").concat(data.age, "</p>\n            <p>Worked at:</p>\n            <ol>\n                <li>").concat(data.companies[0], "</li>\n                <li>").concat(data.companies[1], "</li>\n            </ol>");
};
get_people();
