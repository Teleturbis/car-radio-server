const express = require('express');
const axios = require('axios');
var path = require('path');

require('dotenv').config();

global.access_token = '';

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

function generateRandomString(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function login(spotify_redirect_uri) {
  var scope =
    'streaming user-read-email user-read-private user-read-playback-state user-read-recently-played user-top-read user-read-currently-playing user-library-read';
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  return (
    'https://accounts.spotify.com/authorize/?' +
    auth_query_parameters.toString()
  );
}

async function authCallback(code, spotify_redirect_uri) {
  const data = await axios.post(
    'https://accounts.spotify.com/api/token',
    {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code',
    },
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
            'base64'
          ),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (data.status === 200) {
    access_token = data.data.access_token;
    return access_token;
  }
}

module.exports = { login, authCallback };
