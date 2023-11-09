const { startRegistration } = SimpleWebAuthnBrowser;


async function registration() {

    const dataUserToSend = {
        'name': document.getElementById('usernameInput').value,
    }

    const responseCreateUser = await fetch('http://host.docker.internal:3000/user', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dataUserToSend)
    });

    const responseStatus = responseCreateUser.status
    if (!responseCreateUser.ok) {
        console.error('Erro na solicitação de criação de usuário. Status: ' + responseStatus);
    }

    const responseUserJson = await responseCreateUser.json();
    const registrationOptionsResponse = await fetch('http://host.docker.internal:3000/registration/' + responseUserJson.id);




    let reponseAuthenticator;
    try {
        reponseAuthenticator = await startRegistration(await registrationOptionsResponse.json());
    } catch (error) {
        // Some basic error handling
        if (error.name === 'InvalidStateError') {
            alert('Error: Authenticator was probably already registered by user');
        } else {
            alert(error);
        }

        throw error;
    }

    responseStatus = reponseAuthenticator.status
    if (!reponseAuthenticator.ok) {
        console.error('Erro na solicitação de criação de usuário. Status: ' + responseStatus);
    }

    const responseAuthenticatorJson = await reponseAuthenticator.json();
    console.log(responseAuthenticatorJson);


    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResp = await fetch('http://host.docker.internal:3000/verify-registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticatorResponse),
    });

    // Wait for the results of verification
    const verificationJSON = await verificationResp.json();

    // Show UI appropriate for the `verified` status
    if (verificationJSON && verificationJSON.verified) {
        alert('Success!');
    } else {
        alert(`Oh no, something went wrong! Response: <pre>${JSON.stringify(verificationJSON)}</pre>`);
    }
}

