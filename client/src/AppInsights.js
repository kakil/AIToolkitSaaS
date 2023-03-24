import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
var appInsights = new ApplicationInsights({
    config: {
        connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin]
    }
});
appInsights.loadAppInsights();

export { reactPlugin, appInsights };