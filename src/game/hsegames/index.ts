import { AppStream, AWSError, Response, S3, config } from 'aws-sdk';
import { isConstructor } from '@nestjs/common/utils/shared.utils';

const s3 = new S3();
// config.update({ region: 'eu-central-1' });
console.log(process.env.AWS_SDK_LOAD_CONFIG);

export const handler = async (userId, callback) => {
  const params = {
    FleetName: 'hsegamesinternetfleet' /* required */,
    StackName: 'HSEGamesStack2' /* required */,
    UserId: 'asdefgelfgvsrdfg' || String(userId),
    Validity: 300,
  };

  // const res = await s3.getObject({
  //   Bucket: 'hsegamesinternetfleet',
  //   Key: 'HSEGamesStack2',
  // });
  //
  // console.log({ res });

  // config.credentials = new AWS.TemporaryCredentials({ RoleArn: sts_params.RoleArn });
  config.update({ region: 'eu-central-1' });

  createas2streamingurl(
    params,
    'e8e9e696-9f6a-4f57-9f91-b407d1f28e86',
    callback,
  );
};

function errorResponse(errorMessage, awsRequestId, callback) {
  //Function for handling error messaging back to client
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': 'http://play.hsegames.com', //This should be the domain of the website that originated the request, example: amazonaws.com
    },
  });
}

interface AWSSuccess {
  StreamingURL: string;
}
function createas2streamingurl(params, awsRequestId, callback) {
  const appstream = new AppStream();
  const request = appstream.createStreamingURL(params);
  request
    .on('success', function (response: Response<AWSSuccess, AWSError>) {
      console.log('Success. AS2 Streaming URL created.');
      const url = (response.data as AWSSuccess).StreamingURL;
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          Message: url,
          Reference: awsRequestId,
        }),
        headers: {
          'Access-Control-Allow-Origin': 'http://play.hsegames.com',
        },
      });
    })
    .on('error', function (response) {
      console.log('Error: ' + JSON.stringify(response.message));
      errorResponse(
        'Error creating AS2 streaming URL.',
        awsRequestId,
        callback,
      );
    })
    .send();
}
