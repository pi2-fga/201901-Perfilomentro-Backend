import semver from 'semver'

export function apiProtocol(request, response, next) {
  const clienAPIVersion = request.header('api-version')
  const serverAPIVersion = '0.1.0'

  // Set default body for response
  const body = {
    api: {
      version: serverAPIVersion,
    },
  }

  if (semver.valid(clienAPIVersion) && semver.gte(clienAPIVersion, serverAPIVersion)) {
    response.locals.body = body
    next()
  } else {
    const error = {
      title: 'Nova versão disponível',
      message: 'É necessário atualizar o aplicativo. Acesse a AppStore para isso',
      kind: 'api',
      fatal: true,
    }

    body.error = error
    response.status(400).send(body)
  }
}
