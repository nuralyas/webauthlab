window.onload = function() {
    loadXMLDoc();

    document.getElementById("showNames").addEventListener("click", function() {
        loadXMLDoc('names');
    });

    document.getElementById("showAll").addEventListener("click", function() {
        loadXMLDoc('all');
    });

    document.getElementById("groupBy").addEventListener("click", function() {
        loadXMLDoc('group');
    });
};

function loadXMLDoc(view = 'all') {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "students.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayStudents(xhr.responseXML, view);
        }
    };
    xhr.send();
}

function displayStudents(xmlDoc, view) {
    var students = xmlDoc.getElementsByTagName("Student");
    var output = "";
    var groupedData = {};

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var matricNo = student.getElementsByTagName("MatricNo")[0].childNodes[0].nodeValue;
        var firstName = student.getElementsByTagName("FirstName")[0].childNodes[0].nodeValue;
        var lastName = student.getElementsByTagName("LastName")[0].childNodes[0].nodeValue;
        var contactNo = student.getElementsByTagName("ContactNo")[0].childNodes[0].nodeValue;
        var email = student.getElementsByTagName("Email")[0].childNodes[0].nodeValue;
        var city = student.getElementsByTagName("City")[0].childNodes[0].nodeValue;
        var state = student.getElementsByTagName("State")[0].childNodes[0].nodeValue;
        var postcode = student.getElementsByTagName("Postcode")[0].childNodes[0].nodeValue;

        switch (view) {
            case 'names':
                output += "<div class='student'>" +
                            "<div class='student-matricNo'>Matric No: " + matricNo + "</div>" +
                            "<div class='student-name'>Name: " + firstName + " " + lastName + "</div>" +
                          "</div>";
                break;
            case 'group':
                var groupKey = city; // Group by City
                if (!groupedData[groupKey]) {
                    groupedData[groupKey] = [];
                }
                groupedData[groupKey].push({
                    matricNo,
                    firstName,
                    lastName,
                    contactNo,
                    email,
                    city,
                    state,
                    postcode
                });
                break;
            case 'all':
            default:
                output += "<div class='student'>" +
                            "<div class='student-matricNo'>Matric No: " + matricNo + "</div>" +
                            "<div class='student-name'>Name: " + firstName + " " + lastName + "</div>" +
                            "<div class='student-contact'>Contact: " + contactNo + "</div>" +
                            "<div class='student-email'>Email: " + email + "</div>" +
                            "<div class='student-address'>Address: " + city + ", " + state + " " + postcode + "</div>" +
                          "</div>";
                break;
        }
    }

    if (view === 'group') {
        output += "<div class='city-groups'>";
        for (var group in groupedData) {
            output += "<section class='city-group'><h2>" + group + "</h2>";
            groupedData[group].forEach(function(student) {
                output += "<div class='student'>" +
                            "<div class='student-matricNo'>Matric No: " + student.matricNo + "</div>" +
                            "<div class='student-name'>Name: " + student.firstName + " " + student.lastName + "</div>" +
                            "<div class='student-contact'>Contact: " + student.contactNo + "</div>" +
                            "<div class='student-email'>Email: " + student.email + "</div>" +
                            "<div class='student-address'>Address: " + student.city + ", " + student.state + " " + student.postcode + "</div>" +
                          "</div>";
            });
            output += "</section>";
        }
        output += "</div>";
    }
    

    document.getElementById("studentList").innerHTML = output;
}
