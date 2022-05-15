# AMCom

### Configurando o ambiente python

- Crie um ambiente virtual python e o ative.
ex.: virtualenv amcom

- Instale as dependências pelo requirements.txt com o ambiente ativo.
ex.: pip install -r requirements.txt

- Entre na pasta /amcomsite e rode o servidor django.
ex.: python manage.py runserver

### Database config

- O banco de dados postgreSQL espera a seguinte configuração, mas você pode colocar como preferir:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'amcomdb',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```

- Após configurar o ambiente python e o DB faça as migrations
ex.: python manage.py migrate

### Configurando o ambiente node

- Entre na pasta /amcomsite/front

- Instale as dependências
ex.: npm install

- Rode o servidor
ex.: npm start


### Postman

O arquivo APIAMCOM.postman_collection.json pode ser importado no postman para ver como a API funciona