-- Conectar ao template1
\c template1;

-- Excluir o banco de dados mywebauthn se existir
DROP DATABASE IF EXISTS mywebauthn;

-- Criar o banco de dados mywebauthn
CREATE DATABASE mywebauthn;

-- Conectar-se ao novo banco de dados criado
\c mywebauthn;

CREATE TABLE public.users (
	id varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	challenge varchar(255) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);


CREATE TABLE public.authenticators (
	id varchar(50) NOT NULL,
	credential_id bytea NOT NULL,
	credential_public_key bytea NOT NULL,
	counter int4 NOT NULL DEFAULT 0,
	credential_device_type varchar(50) NULL,
	credential_backed_up bool NULL,
	transports varchar(255) NULL,
	user_id varchar(50) NOT NULL,
	CONSTRAINT authenticators_pk PRIMARY KEY (id),
	CONSTRAINT authenticators_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);