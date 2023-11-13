const { startRegistration, startAuthentication, browserSupportsWebAuthn } = SimpleWebAuthnBrowser;

let userId

if (!browserSupportsWebAuthn()) {
    alert('navegador não suporta webauthn')
}

async function registration() {

    // criando um novo usuário
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

    if (!responseCreateUser.status >= 300) {
        console.error('Erro na solicitação de criação de usuário. Status: ' + responseCreateUser.status);
    }

    const responseUserJson = await responseCreateUser.json();
    console.log('responseUserJson', responseUserJson);
    userId = responseUserJson.id


    // buscando as opções para registro de um novo usuário
    const responseRegistrationOptions = await fetch('http://host.docker.internal:3000/registration/' + userId);
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
    const responseVerifyRegistration = await fetch('http://host.docker.internal:3000/registration/verify/' + userId, {
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
        alert('Boa! Tudo certo com o processo de registro.');
    } else {
        alert(`Erro no processo de verificação do registro: <pre>${JSON.stringify(responseVerifyRegistrationJSON)}</pre>`);
    }
}


async function authentication() {

    // buscando as opções para um processo de autenticação do usuário
    const responseAuthenticationOptions = await fetch('http://host.docker.internal:3000/authentication/' + userId);
    if (!responseAuthenticationOptions.status >= 300) {
        console.error('Erro ao verificar as opções para autenticação. Status: ' + responseAuthenticationOptions.status);
    }

    // iniciando o processo de autenticação no autenticador webauthn
    const responseAuthenticationOptionsJson = await responseAuthenticationOptions.json()
    console.log('responseAuthenticationOptionsJson', responseAuthenticationOptionsJson);
    let reponseAuthenticator;
    try {
        reponseAuthenticator = await startAuthentication(responseAuthenticationOptionsJson, true);
    } catch (error) {
        alert(error);
        throw error;
    }

    // invocando o serviço para verificar o desafio de autenticação
    const responseVerifyAuthentication = await fetch('http://host.docker.internal:3000/authentication/verify/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reponseAuthenticator),
    });

    if (!responseVerifyAuthentication.status >= 300) {
        console.error('Erro ao verificar o desafio de autenticação. Status: ' + responseVerifyAuthentication.status);
    }

    const responseVerifyAuthenticationJSON = await responseVerifyAuthentication.json();
    console.log('responseVerifyAuthenticationJSON', responseVerifyAuthenticationJSON);

    if (responseVerifyAuthenticationJSON && responseVerifyAuthenticationJSON.verified) {
        alert('Pronto! Usuário autenticado via WebAuthn');
    } else {
        alert(`Erro no processo de verificação da autenticação: <pre>${JSON.stringify(responseVerifyAuthenticationJSON)}</pre>`);
    }

}

