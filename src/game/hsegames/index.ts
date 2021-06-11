import { AppStream, AWSError, Response, config } from 'aws-sdk';
import { UsersModel } from '../../users/users.model';

export const handler = async (user: UsersModel, token: string, callback) => {
  const fleet = user.company.fleet;
  const stack = user.company.stack;

  const params = {
    ApplicationId: 'TestJson',
    FleetName: fleet,
    StackName: stack,
    UserId: `id${user.id}`,
    Validity: 300,
    SessionContext: token,
  };

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
    body: {
      error: errorMessage,
      // Reference: awsRequestId,
    },
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
      const url = (response.data as AWSSuccess).StreamingURL;
      callback(null, {
        statusCode: 201,
        body: {
          url,
          // Reference: awsRequestId,
        },
        headers: {
          'Access-Control-Allow-Origin': 'http://play.hsegames.com',
        },
      });
    })
    .on('error', function (response) {
      errorResponse(
        'Error creating AS2 streaming URL.' + JSON.stringify(response),
        awsRequestId,
        callback,
      );
    })
    .send();
}
