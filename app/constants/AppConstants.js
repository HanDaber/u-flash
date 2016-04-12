import pkg from '../../package'

export const DEBUG = (process.env.NODE_ENV !== 'production')
export const APP_TITLE = pkg.name
export const TITLE = pkg.description

export const DEFAULT_RETURN_VALUE = ''
export const ITEMS_GET_SUCCESS = 'ITEMS_GET_SUCCESS'
export const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR'
export const ITEMS_UPDATED = 'ITEMS_UPDATED'

export const DELETE_EVENT = 'delete'
export const CLEAR_EVENT = 'clear'
export const CHANGE_EVENT = 'change'

// URLs should include an ending /
export const SERVER_PORT = process.env.PORT || 8080
export const BACKEND_PORT = 3000

export const DEV_API_URL = pkg.config.devServerEndpoint
export const EBS_API_URL = pkg.config.serverEndpoint
export const TEST_API_URL = pkg.config.serverEndpoint+'test/'
// export const EBS_API_URL = 'http://buschcore.elasticbeanstalk.com/'
export const API_URL = ( process.env.NODE_ENV === 'production'
	? EBS_API_URL
	: DEV_API_URL
)

export const DEV_BACKEND_URL = pkg.config.devBackendEndpoint
export const EBS_BACKEND_URL = pkg.config.backendEndpoint
export const TEST_BACKEND_URL = pkg.config.backendEndpoint+'test/'
// export const EBS_BACKEND_URL = 'http://buschcore-backend.elasticbeanstalk.com/'
export const BACKEND_URL = ( process.env.NODE_ENV === 'production'
	? EBS_BACKEND_URL
	: DEV_BACKEND_URL
)

export const S3_BUCKET_URL = 'http://s3-us-west-2.amazonaws.com/buschcore-files/'
export const S3_PUBLIC_URL = 'http://buschcore.com.s3-website-us-west-2.amazonaws.com/'
