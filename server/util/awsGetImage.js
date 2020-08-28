// var S3 = require('aws-sdk/clients/s3');
const aws = require('aws-sdk');

// Function used to get images from aws storage

const awsGetImage = async (bucket, keyName, req, res, next) => {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });

    const s3 = new aws.S3();
    const response = await s3
      .getObject({
        Bucket: `${bucket}`,
        Key: `${keyName}`,
      })
      .promise();

    // process.env.PRODUCT_ADDRES;

    const awslink = await response.Body.toString('base64');

    console.log(awslink);
  } catch (error) {
    // res.status(500).send(error);
    console.log('our error', error);
  }
};

//   const picImage = s3.getObject({ Bucket: `${bucket}`, Key: `${keyName}` });

//   console.log(picImage);
// theelites

module.exports = awsGetImage;
