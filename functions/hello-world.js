exports.handler = async() => {

  console.log({TEST_VALUE: process.env.TEST_VALUE});
    return {
        statusCode: 200,
        body: 'Hello World!',
    };
};