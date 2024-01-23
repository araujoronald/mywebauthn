const { startRegistration, startAuthentication, browserSupportsWebAuthn } = SimpleWebAuthnBrowser;

let userId
let userEmail

if (!browserSupportsWebAuthn()) {
    alert('navegador não suporta webauthn')
}

async function registration() {

    // criando um novo usuário
    const dataUserToSend = {
        'name': document.getElementById('usernameInput').value,
    }

    const responseCreateUser = await fetch('http://localhost:3000/user', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dataUserToSend)
    });

    if (!responseCreateUser.status >= 300) {
        console.error('Erro na solicitação de criação de usuário. Status: ' + responseCreateUser.status);
        return;
    }

    const responseUserJson = await responseCreateUser.json();
    console.log('responseUserJson', responseUserJson);
    userId = responseUserJson.id


    // buscando as opções para registro de um novo usuário
    const responseRegistrationOptions = await fetch('http://localhost:3000/registration/' + userId);
    if (!responseRegistrationOptions.status >= 300) {
        console.error('Erro ao recuperar as opções para registro. Status: ' + responseRegistrationOptions.status);
    }


    // iniciando o authenticador webauthn
    const responseRegistrationOptionsJson = await responseRegistrationOptions.json()
    console.log('responseRegistrationOptionsJson', responseRegistrationOptionsJson);

    let reponseAuthenticator;
    try {
        reponseAuthenticator = await startRegistration(responseRegistrationOptionsJson);
    } catch (error) {
        if (error.name === 'InvalidStateError') {
            alert('Erro: O Autenticador já deve estar registrado para o usuário informado');
        } else {
            alert(error);
        }

        throw error;
    }

    // invocando o serviço de verificação do autenticador
    const responseVerifyRegistration = await fetch('http://localhost:3000/registration/verify/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reponseAuthenticator),
    });

    if (!responseVerifyRegistration.status >= 300) {
        console.error('Erro ao verificar as opções para registro. Status: ' + responseVerifyRegistration.status);
    }

    // inspecionando a resposta do serviço de verificação
    const responseVerifyRegistrationJSON = await responseVerifyRegistration.json();
    console.log('responseVerifyRegistrationJSON', responseVerifyRegistrationJSON);

    if (responseVerifyRegistrationJSON && responseVerifyRegistrationJSON.verified) {
        document.getElementById('user-id').innerText = responseRegistrationOptionsJson.user.id
        document.getElementById('user-name').innerText = responseRegistrationOptionsJson.user.displayName
        showElement(document.getElementById('authenticated-content'))
        hideElement(document.getElementById('main-content'))
    } else {
        alert(`Erro no processo de verificação do registro: <pre>${JSON.stringify(responseVerifyRegistrationJSON)}</pre>`);
    }
}

async function authentication() {

    userEmail = document.getElementById('usernameInput')?.value
    // buscando as opções para um processo de autenticação do usuário
    let responseAuthenticationOptions;
    let user;
    if (userId) {
        responseAuthenticationOptions = await fetch('http://localhost:3000/authentication/' + userId);
    } else if (userEmail) {
        responseAuthenticationOptions = await fetch('http://localhost:3000/authentication/email/' + userEmail);
        const userResponse = await fetch('http://localhost:3000/user/' + userEmail)
        user = await userResponse.json()
        console.log(user)
    } else {
        responseAuthenticationOptions = await fetch('http://localhost:3000/authentication');
    }

    if (!responseAuthenticationOptions.status >= 300) {
        alert('Tente outra vez com um email de usuário cadastrado');
        console.error('Erro ao verificar as opções para autenticação. Status: ' + responseAuthenticationOptions.status);
    }


    // iniciando o processo de autenticação no autenticador webauthn
    const responseAuthenticationOptionsJson = await responseAuthenticationOptions.json()
    console.log('responseAuthenticationOptionsJson', responseAuthenticationOptionsJson);

    let reponseAuthenticator;
    try {
        if (userEmail) {
            reponseAuthenticator = await startAuthentication(responseAuthenticationOptionsJson);
        } else {
            reponseAuthenticator = await startAuthentication(responseAuthenticationOptionsJson, true);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    userId = reponseAuthenticator.response.userHandle
    if (!userId) {
        userId = user.id
    }

    // invocando o serviço para verificar o desafio de autenticação
    const responseVerifyAuthentication = await fetch('http://localhost:3000/authentication/verify/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-id': responseAuthenticationOptionsJson.sid
        },
        body: JSON.stringify(reponseAuthenticator),
    });

    if (!responseVerifyAuthentication.status >= 300) {
        console.error('Erro ao verificar o desafio de autenticação. Status: ' + responseVerifyAuthentication.status);
    }

    const responseVerifyAuthenticationJSON = await responseVerifyAuthentication.json();
    console.log('responseVerifyAuthenticationJSON', responseVerifyAuthenticationJSON);

    if (responseVerifyAuthenticationJSON && responseVerifyAuthenticationJSON.verified) {
        document.getElementById('user-id').innerText = responseVerifyAuthenticationJSON.user.id
        document.getElementById('user-name').innerText = responseVerifyAuthenticationJSON.user.displayName
        showElement(document.getElementById('authenticated-content'))
        hideElement(document.getElementById('main-content'))
    } else {
        alert(`Erro no processo de verificação da autenticação: <pre>${JSON.stringify(responseVerifyAuthenticationJSON)}</pre>`);
    }
}

function showElement(elem) {
    elem.style.display = "block"
}

function hideElement(elem) {
    elem.style.display = "none"
}

authentication()

