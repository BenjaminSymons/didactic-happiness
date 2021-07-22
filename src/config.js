const config = {
    s3: {
        REGION: 'us-east-1',
        BUCKET: 'online-academy-courses'
    },
    apiGateway: {
        REGION: 'us-east-1',
        URL: 'https://ot2retyh18.execute-api.us-east-1.amazonaws.com/prod'
    },
    cognito: {
        REGION: 'us-east-1',
        USER_POOL_ID: 'us-east-1_cLcUZ2rgW',
        APP_CLIENT_ID: '1p2tj9lgph88dbpqh1460ea2ep',
        IDENTITY_POOL_ID: 'us-east-1:11b3b482-92fc-496f-801b-76237648d85d'
    }
}

export default config