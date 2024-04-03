
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const confirmationDiv = document.getElementById('confirmationMessage');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(registrationForm);

        // Calculate fee based on status
        let fee = 0;
        switch (formData.get('status')) {
            case 'student':
                fee = 10;
                break;
            case 'staff':
                fee = 50;
                break;
            case 'volunteer':
                fee = 0;
                break;
        }

        formData.append('fee', fee);
        
        // Log form data to console
        console.log('Confirmation message:');
        formData.forEach((value, key) => {
            console.log(key, value);
            
        });
        // Display confirmation notice
        confirmationDiv.innerHTML = `<h2>Confirmation Notice!</h2>
                                      <p><strong>ID:</strong> ${formData.get('id')}</p>
                                      <p><strong>Full Name:</strong> ${formData.get('fullName')}</p>
                                      <p><strong>Address:</strong> ${formData.get('address')}</p>
                                      <p><strong>Status:</strong> ${formData.get('status')}</p>
                                      <p><strong>Fee:</strong> $${fee}</p>`;

        // Hide the form
        registrationForm.style.display = 'none';
        confirmationDiv.style.display = 'block';

        // Send form data to the server using fetch API
        fetch('https://bvc-registration-backend.onrender.com/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: formData.get('id'),
            fullName: formData.get('fullName'),
            address: formData.get('address'),
            status: formData.get('status'),
            fee: fee
        })
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Display confirmation message
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    });
});
